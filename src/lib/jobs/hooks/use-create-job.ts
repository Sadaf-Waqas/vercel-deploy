import { FirebaseError } from "firebase/app";
import { collection, addDoc } from 'firebase/firestore';
import { useCallback } from "react";
import { useFirestore } from "reactfire";
import { useRequestState } from "~/core/hooks/use-request-state";
import { JobDetail } from "../types/jobs";

import { JOBS_COLLECTION } from "~/lib/firestore-collections";
import { useCreateProperty } from "~/lib/properties/hooks/use-create-property";
import { PropertyDetail } from "~/lib/properties/types/properties";

export function useCreateJob() {
  const firestore = useFirestore();
  const { state, setError, setData, setLoading } = useRequestState<Partial<WithId<JobDetail>>>();
  const [createProperty, propertyData] = useCreateProperty();

  const createJob = useCallback(
    async (job: JobDetail) => {
      const property_payload: PropertyDetail = {
        property_name: job.property?.propertyName as string,
        property_address: job.property?.propertyAddress as string,
        supervisor_name: job.property?.supervisorName as string,
        email: job.property?.emailAddress as string,
        phone: job.property?.phoneNumber as string,
        access_instructions: job.property?.accessProperty as string,
      };
      const property_id = await createProperty(property_payload);

      const payload = {
        checked_in: [],
        external_job_id: '019562',
        installer_id: 'xfa2HMp7YW9cyndSqflB',
        labor: [
          JSON.stringify({ catalog_id: job.detail?.category, amount: job.detail?.jobSize }),
        ],
        office_id: '6vyUHmdzF3lTYgIjoflC',
        property_id: property_id,
        date: new Date().toDateString(),
        planned_start: job.timeline?.plannedStartDate && "",
        due_date: job.timeline?.dueDate && "",
        priority: job.timeline?.priority && "",
      };
      setLoading(true);
      try {
        const ref = await addDoc(collection(firestore, JOBS_COLLECTION), payload);
        setData({
          id: ref.id, ...payload,
        });
      } catch (e) {
        setError((e as FirebaseError).message);
        console.log(e);
        throw e;
      }
    },
    [firestore, setData, setError, setLoading, createProperty, propertyData.data?.id],
  );

  return [createJob, state] as [
    typeof createJob,
    typeof state,
  ];
}
