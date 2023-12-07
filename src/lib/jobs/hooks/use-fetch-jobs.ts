import {
  collection,
  query,
  CollectionReference,
} from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

import { JobDB } from '~/lib/jobs/types/jobs';
import { JOBS_COLLECTION } from '~/lib/firestore-collections';
import { useFetchSuperviosrs } from '~/lib/supervisors/hooks/use-fetch-supervisors';
import { useFetchCatalogues } from '~/lib/catalogues/hooks/use-fetch-catalogues';
import { useFetchProperties } from '~/lib/properties/hooks/use-fetch-properties';
import { useFetchInstallers } from '~/lib/installers/hooks/use-fetch-installers';


export function useFetchJobs(userId: string) {
  const firestore = useFirestore();

  const jobsCollection = collection(
    firestore,
    JOBS_COLLECTION
  ) as CollectionReference<WithId<JobDB>>;

  const jobsQuery = query(jobsCollection);
  const jobsData = useFirestoreCollectionData(jobsQuery, {
    idField: `id`,
    initialData: [],
  }).data;

  const { data: propertiesData } = useFetchProperties();
  const { data: supervisorsData } = useFetchSuperviosrs();
  const { data: labourCataloguesData } = useFetchCatalogues();
  const { data: installersData } = useFetchInstallers();

  return {
    data: jobsData.map((job) => ({
      ...job,
      property_data: propertiesData.find((property) => property.id === job.property_id),
      supervisor_data: supervisorsData.find((supervisor) => supervisor.id === job.supervisor_id),
      installer_data: installersData.find((installer) => installer.id === job.installer_id),
      labour_data: job.labor?.map((item) => {
        const labor_data: { catalog_id: string; amount: string; } = JSON.parse(item);
        return {
          catalog: labourCataloguesData.find((labor) => labor.id === labor_data.catalog_id),
          amount: labor_data.amount,
        }
      })
    })), status: 'success'
  };
}
