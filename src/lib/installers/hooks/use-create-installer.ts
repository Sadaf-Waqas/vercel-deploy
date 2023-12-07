import { useCallback } from "react";
import { useFirestore } from "reactfire";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { useRequestState } from "~/core/hooks/use-request-state";
import { InstallerDetail } from "../types/installers";
import { INSTALLERS_COLLECTION } from "~/lib/firestore-collections";

export function useCreateInstaller() {
  const firestore = useFirestore();
  const { state, setError, setData, setLoading } = useRequestState<Partial<WithId<InstallerDetail>>>();

  const createInstaller = useCallback(
    async (installer: InstallerDetail) => {
      setLoading(true);
      try {
        const installerRef = await addDoc(collection(firestore, INSTALLERS_COLLECTION), installer);

        if (installerRef) {
          setData({
            id: installerRef.id,
            ...installer,
          });
        }
      } catch (e) {
        setError((e as FirebaseError).message);
        console.log(e);
        throw e;
      }
    }, [firestore, setError, setData, setLoading],
  );

  return [createInstaller, state] as [
    typeof createInstaller,
    typeof state
  ];
}
