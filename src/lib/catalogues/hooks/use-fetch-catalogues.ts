import {
  collection,
  query,
  CollectionReference,
} from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import { LABOUR_CATALOGUE_COLLECTION } from '~/lib/firestore-collections';
import { LabourCatalogueDB } from '../types/catalogues';

export function useFetchCatalogues() {
  const firestore = useFirestore();

  const cataloguesCollection = collection(
    firestore,
    LABOUR_CATALOGUE_COLLECTION,
  ) as CollectionReference<WithId<LabourCatalogueDB>>;

  const cataloguesQuery = query(cataloguesCollection);
  return useFirestoreCollectionData(cataloguesQuery, {
    idField: `id`,
    initialData: []
  });
}
