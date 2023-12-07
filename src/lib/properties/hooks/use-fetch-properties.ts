import {
  collection,
  query,
  CollectionReference,
} from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import { PROPERTY_COLLECTION } from '~/lib/firestore-collections';
import { PropertyDB } from '../types/properties';

export function useFetchProperties() {
  const firestore = useFirestore();

  const propertiesCollection = collection(
    firestore,
    PROPERTY_COLLECTION,
  ) as CollectionReference<WithId<PropertyDB>>;

  const propertiesQuery = query(propertiesCollection);
  return useFirestoreCollectionData(propertiesQuery, {
    idField: `id`,
    initialData: []
  });
}
