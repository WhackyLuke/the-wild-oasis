import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient(); //getting access to client

  //useMutation returns a callback (mutate) which can be used as onClick
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin succesfully deleted!");
      //calling a method on client
      queryClient.invalidateQueries({
        //using cabins key
        queryKey: ["cabins"],
      });
    },
    //gets access to error thrown from mutation function
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin };
}
