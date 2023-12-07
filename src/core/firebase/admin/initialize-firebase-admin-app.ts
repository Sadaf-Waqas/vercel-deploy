import configuration from '~/configuration';

/**
 * @description Initializes the firebase Admin app.
 * If emulator=true, will start the emulator admin
 */
export async function initializeFirebaseAdminApp() {
  const emulator = configuration.emulator;

  if (emulator) {
    const { createEmulatorAdminApp } = await import(
      './create-emulator-admin-app'
    );

    return createEmulatorAdminApp();
  }

  const clientEmail = getClientEmail();
  const privateKey = getPrivateKey();

  const projectId = configuration.firebase.projectId;
  const storageBucket = configuration.firebase.storageBucket;

  if (!clientEmail) {
    throw new Error(
      `Cannot create Firebase Admin App. Please provide the client email associated with the service account`,
    );
  }

  if (!privateKey) {
    throw new Error(
      `Cannot create Firebase Admin App. Please provide the private key associated with the service account`,
    );
  }

  if (!projectId) {
    throw new Error(
      `Cannot create Firebase Admin App. Please provide the project id associated with the service account`,
    );
  }

  if (!storageBucket) {
    throw new Error(
      `Cannot create Firebase Admin App. Please provide the storage bucket associated with the service account`,
    );
  }

  const { createFirebaseAdminApp } = await import('./create-admin-app');

  return createFirebaseAdminApp({
    projectId,
    storageBucket,
    clientEmail,
    privateKey,
  });
}

function getClientEmail() {
  const clientEmail = process.env.SERVICE_ACCOUNT_CLIENT_EMAIL;

  /**
   * @description Old variable name. Deprecated. Use SERVICE_ACCOUNT_CLIENT_EMAIL instead.
   * @deprecated
   */
  const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (firebaseClientEmail) {
    console.warn(
      `The key FIREBASE_CLIENT_EMAIL is deprecated. Please use SERVICE_ACCOUNT_CLIENT_EMAIL instead.`,
    );
  }

  return clientEmail || firebaseClientEmail;
}

function getPrivateKey() {
  const privateKey = process.env.SERVICE_ACCOUNT_PRIVATE_KEY;

  /**
   * @description Old variable name. Deprecated. Use SERVICE_ACCOUNT_PRIVATE_KEY instead.
   * @deprecated
   */
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (firebasePrivateKey) {
    console.warn(
      `The key FIREBASE_PRIVATE_KEY is deprecated. Please use SERVICE_ACCOUNT_PRIVATE_KEY instead.`,
    );
  }

  return privateKey || firebasePrivateKey;
}
