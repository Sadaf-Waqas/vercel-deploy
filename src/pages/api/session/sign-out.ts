import type { NextApiRequest, NextApiResponse } from 'next';

import { withPipe } from '~/core/middleware/with-pipe';
import { withMethodsGuard } from '~/core/middleware/with-methods-guard';
import { withExceptionFilter } from '~/core/middleware/with-exception-filter';
import { withAdmin } from '~/core/middleware/with-admin';
import { signOutServerSession } from '~/core/session/sign-out-server-session';

const SUPPORTED_HTTP_METHODS: HttpMethod[] = ['POST'];

/**
 * @description
 * Revoke the session cookie when the user signs-out client-side
 * and redirect to the home page.
 * If any error occurs, the user is redirected to the home page
 */
async function signOut(req: NextApiRequest, res: NextApiResponse) {
  await signOutServerSession(req, res);

  res.send({ success: true });
}

export default function sessionSignOutHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const handler = withPipe(
    withMethodsGuard(SUPPORTED_HTTP_METHODS),
    withAdmin,
    signOut,
  );

  return withExceptionFilter(req, res)(handler);
}
