import {
  collection,
  query,
  CollectionReference,
} from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import { INSTALLERS_COLLECTION } from '~/lib/firestore-collections';
import { InstallerDB } from '../types/installers';

export function useFetchInstallers() {
  const firestore = useFirestore();

  const installersCollection = collection(
    firestore,
    INSTALLERS_COLLECTION,
  ) as CollectionReference<WithId<InstallerDB>>;

  const installersQuery = query(installersCollection);
  return useFirestoreCollectionData(installersQuery, {
    idField: `id`,
    initialData: []
  });
}
