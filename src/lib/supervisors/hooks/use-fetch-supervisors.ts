import {
  collection,
  query,
  CollectionReference,
} from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import { SUPERVISOR_COLLECTION } from '~/lib/firestore-collections';
import { SupervisorDB } from '../types/supervisors';

export function useFetchSuperviosrs() {
  const firestore = useFirestore();

  const supervisorsCollection = collection(
    firestore,
    SUPERVISOR_COLLECTION,
  ) as CollectionReference<WithId<SupervisorDB>>;

  const supervisorsQuery = query(supervisorsCollection);
  return useFirestoreCollectionData(supervisorsQuery, {
    idField: `id`,
    initialData: [],
  });
}
