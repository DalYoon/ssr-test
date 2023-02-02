import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export interface IListItem {
  id?: string;
  name?: string;
  rank?: number;
}

export const makeKey = (id?: string) => {
  if (!id) return "/coins";
  else return `/coins/${id}`;
};

export const getList = async (): Promise<IListItem[]> => {
  return fetcher(makeKey()).then((res) => res?.slice(0, 5));
};

export const useList = () => {
  const { data: coins } = useSWR<IListItem[]>(makeKey(), fetcher, {
    suspense: true,
  });
  return coins?.slice(0, 5);
};

export const getById = async (id: string): Promise<IListItem> => {
  return fetcher(makeKey(id));
};

export const useById = (id: string) => {
  const { data: coin } = useSWR<IListItem>(makeKey(id), fetcher, {
    suspense: true,
  });
  return coin;
};
