import { useCallback } from "react";
import { useFirestore } from "reactfire";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { useRequestState } from "~/core/hooks/use-request-state";
import { Location, LocationFormData } from "../types/location";
import { LOCATIONS_COLLECTION } from "~/lib/firestore-collections";

export function useCreateLocation() {
  const firestore = useFirestore();
  const { state, setError, setData, setLoading } = useRequestState<Partial<WithId<Location>>>();

  const createLocation = useCallback(
    async (location: LocationFormData) => {
      const locationPayload = {
        address: location.officeAddress,
        installation_manager: location.installerManagerName,
      };

      setLoading(true);
      try {
        const locationRef = await addDoc(collection(firestore, LOCATIONS_COLLECTION), locationPayload);

        if (locationRef) {
          setData(locationRef);
        }
      } catch (e) {
        setError((e as FirebaseError).message);
        console.log(e);
        throw e;
      }

    }, [firestore, setData, setError, setLoading],
  );

  return [createLocation, state] as [
    typeof createLocation,
    typeof state,
  ];
}

