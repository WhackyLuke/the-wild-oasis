import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success(`User cuccessfully edited`);
    },
    onError: () => {
      toast.error(`There was na error updating user`);
    },
  });
  return { updateUser, isUpdatingUser };
}
