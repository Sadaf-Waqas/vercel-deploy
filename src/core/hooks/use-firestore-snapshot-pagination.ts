import { useCallback, useMemo, useRef } from 'react';

type BeforeSnapshot = {
  beforeSnapshot: string;
};

type AfterSnapshot = {
  afterSnapshot: string;
};

type CallbackParams = {
  page: number;
} & (BeforeSnapshot | AfterSnapshot);

type Direction = 'forward' | 'backward';

/**
 * @name useFirestoreSnapshotPagination
 * @param pageIndex
 * @param onChange
 */
export function useFirestoreSnapshotPagination({
  pageIndex,
  onChange,
}: {
  pageIndex: number;
  onChange: (params: CallbackParams) => void;
}) {
  const pageRef = useRef<number>(pageIndex);

  const snapshotRef = useRef<{
    direction: Direction;
    value: string;
  }>();

  const onPaginationChange = useCallback(
    (params: { pageIndex: number; value: string }) => {
      const nextPageIndex = params.pageIndex + 1;
      const direction = nextPageIndex <= pageIndex ? 'backward' : 'forward';

      pageRef.current = nextPageIndex;

      snapshotRef.current = {
        direction,
        value: params.value,
      };

      const queryParams =
        direction === 'forward'
          ? {
              afterSnapshot: params.value,
              page: nextPageIndex,
            }
          : {
              beforeSnapshot: params.value,
              page: nextPageIndex,
            };

      onChange(queryParams);
    },
    [onChange, pageIndex],
  );

  return useMemo(() => {
    return {
      onPaginationChange,
    };
  }, [onPaginationChange]);
}
