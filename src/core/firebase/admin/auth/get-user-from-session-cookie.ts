import { getAuth } from 'firebase-admin/auth';

/**
 * @name getUserFromSessionCookie
 * @description Gets the current ID token from session cookie
 * @param session
 * @param checkRevoked
 */
export async function getUserFromSessionCookie(
  session: string,
  checkRevoked = true
) {
  const auth = getAuth();

  return auth.verifySessionCookie(session, checkRevoked);
}
