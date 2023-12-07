import type { AppOptions } from 'firebase-admin/app';

/**
 * @name createEmulatorAdminApp
 * @param appName
 */
export async function createEmulatorAdminApp(appName?: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const options: AppOptions = { projectId };

  const { getApps, getApp, initializeApp } = await import('firebase-admin/app');

  if (getApps().length) {
    return getApp(appName);
  }

  return initializeApp(options, appName);
}
