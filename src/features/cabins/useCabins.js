import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"], // name of data in cache
    queryFn: getCabins, // queryFn must return a promise!
  });
  return { cabins, isLoading, error };
}
