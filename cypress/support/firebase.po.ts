import { initializeApp } from 'firebase/app';

function createFirebaseApp() {
  const env = (varName: string) => Cypress.env(varName) as string;

  const config = {
    apiKey: env('FIREBASE_API_KEY'),
    projectId: env('FIREBASE_PROJECT_ID'),
    storageBucket: env('FIREBASE_STORAGE_BUCKET'),
    appId: env('FIREBASE_APP_ID'),
  };

  return initializeApp(config);
}

export const testFirebaseApp = createFirebaseApp();
