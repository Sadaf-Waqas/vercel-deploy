import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { destroyCookie } from 'nookies';
import logger from '~/core/logger';

const SESSION_COOKIE_NAME = 'session';
const SESSION_EXPIRES_AT_COOKIE_NAME = 'sessionExpiresAt';
const SESSION_CSRF_SECRET_COOKIE = `csrfSecret`;
const COOKIE_PATH = '/';

type Req = NextApiRequest | GetServerSidePropsContext['req'];
type Res = NextApiResponse | GetServerSidePropsContext['res'];

/**
 * Signs out the server session by revoking the session cookie and destroying the session cookies.
 */
export async function signOutServerSession(req: Req, res: Res) {
  const sessionCookie = req.cookies[SESSION_COOKIE_NAME];

  // if the session cookies does not exist
  // we cannot delete nor sign the user out
  // so, we end the request
  if (!sessionCookie) {
    logger.warn(`No session cookie was provided`);

    return;
  }

  try {
    await revokeCookie(sessionCookie);

    destroySessionCookies(res);
  } catch (e) {
    const error = e instanceof Error ? e.message : e;
    logger.warn(
      `Could not destroy user's session: ${error}. Removing cookies.`,
    );

    destroySessionCookies(res);
  }
}

async function revokeCookie(sessionCookie: string) {
  const { getAuth } = await import('firebase-admin/auth');
  const auth = getAuth();
  const { sub } = await getAuth().verifySessionCookie(sessionCookie);

  return auth.revokeRefreshTokens(sub);
}

/**
 * @description destroy session cookies to sign user out
 * @param res
 */
function destroySessionCookies(res: Res) {
  const options = { path: COOKIE_PATH };

  destroyCookie({ res }, SESSION_COOKIE_NAME, options);
  destroyCookie({ res }, SESSION_EXPIRES_AT_COOKIE_NAME, options);
  destroyCookie({ res }, SESSION_CSRF_SECRET_COOKIE, options);
}
