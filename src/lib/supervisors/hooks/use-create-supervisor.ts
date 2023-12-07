import { useFirestore } from "reactfire";
import { useRequestState } from "~/core/hooks/use-request-state";
import { SupervisorDetail } from "../types/supervisors";
import { useCallback } from "react";

import { addDoc, collection } from "firebase/firestore";
import { SUPERVISOR_COLLECTION } from "~/lib/firestore-collections";
import { FirebaseError } from "firebase-admin";

export function useCreateSupervisor() {
  const firestore = useFirestore();
  const { state, setError, setData, setLoading } = useRequestState<Partial<WithId<SupervisorDetail>>>();

  const createSupervisor = useCallback(
    async (supervisor: SupervisorDetail) => {
      setLoading(true);
      try {
        const supervisorRef = await addDoc(collection(firestore, SUPERVISOR_COLLECTION), supervisor);
        setData({
          ...supervisor,
          id: supervisorRef.id,
        });

        return supervisorRef.id;
      } catch (e) {
        setError((e as FirebaseError).message);
        console.log(e);
        throw e;
      }
    }, [firestore, setData, setError, setLoading],
  );

  return [createSupervisor, state] as [
    typeof createSupervisor,
    typeof state,
  ];
}
