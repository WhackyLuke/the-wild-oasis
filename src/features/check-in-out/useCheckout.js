import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    // onsuccess gets acces to data returned from mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      //invalidates all querries that are active on the page
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("There was an error while checking out");
    },
  });
  return { checkOut, isCheckingOut };
}
