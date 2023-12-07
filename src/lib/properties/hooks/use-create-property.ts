import { FirebaseError } from "firebase/app";
import { collection, addDoc } from 'firebase/firestore';
import { useCallback } from "react";
import { useFirestore } from "reactfire";

import { useRequestState } from "~/core/hooks/use-request-state";
import { PROPERTY_COLLECTION } from "~/lib/firestore-collections";
import { PropertyDetail } from "../types/properties";
import { useCreateSupervisor } from "~/lib/supervisors/hooks/use-create-supervisor";

export function useCreateProperty() {
  const firestore = useFirestore();
  const { state, setError, setData, setLoading } = useRequestState<Partial<WithId<PropertyDetail>>>();
  const [createSupervisor, supervisorData] = useCreateSupervisor();

  const createProperty = useCallback(
    async (propertyDetail: PropertyDetail) => {
      setLoading(true);
      const payload = {
        name: propertyDetail.property_name,
        address: propertyDetail.property_address,
        access_instructions: propertyDetail.access_instructions,
      };
      try {

        const supervisor_id = await createSupervisor({
          name: propertyDetail.supervisor_name,
          email: propertyDetail.email,
          phone: propertyDetail.phone,
        });

        const propertyRef = await addDoc(collection(firestore, PROPERTY_COLLECTION), {
          supervisor_id: supervisor_id,
          ...payload,
        });

        setData({
          id: propertyRef.id,
          ...payload,
        });

        return propertyRef.id;
      } catch (e) {
        setError((e as FirebaseError).message);
        console.log(e);
        throw e;
      }
    }, [firestore, createSupervisor, setData, setLoading, setError, supervisorData.data?.id],
  );

  return [createProperty, state] as [
    typeof createProperty,
    typeof state,
  ];
}
