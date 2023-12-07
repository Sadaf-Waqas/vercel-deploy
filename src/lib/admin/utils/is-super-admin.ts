import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { getUserInfoById } from '~/core/firebase/admin/auth/get-user-info-by-id';
import { getLoggedInUser } from '~/core/firebase/admin/auth/get-logged-in-user';
import { GlobalRole } from '~/core/session/types/global-role';

type ApiRequestContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

type Ctx = ApiRequestContext | GetServerSidePropsContext;

/**
 * @name isSuperAdmin
 * @description Checks if the current logged in user is a Super Admin
 * @param ctx
 */
export async function isSuperAdmin(ctx: Ctx) {
  const checkTokenRevoked = true;

  const user = await getLoggedInUser(ctx, checkTokenRevoked);
  const data = await getUserInfoById(user.uid);

  if (!data) {
    throw new Error('User not found');
  }

  const claims = data.customClaims;

  return claims.role === GlobalRole.SuperAdmin;
}
