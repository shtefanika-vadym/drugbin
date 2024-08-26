import { isNil } from "lodash-es";
import useSWR, { BareFetcher, KeyedMutator, SWRConfiguration } from "swr";

export const SWR_CONFIG = {
  revalidateOnFocus: false,
};

export interface Model<T, E> {
  data?: T;
  error?: E;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<T>;
}

export const useData = <T, E = Error>(
  key: string,
  fetcher: BareFetcher<T> | null,
  shouldExecute: boolean = true,
  config: SWRConfiguration = SWR_CONFIG
): Model<T, E> => {
  const { data, error, mutate } = useSWR<T, E>(
    shouldExecute ? key : null,
    fetcher,
    config
  );

  return {
    data,
    error,
    isLoading: !error && isNil(data) && shouldExecute,
    isError: !!error,
    mutate,
  };
};
