import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();
  function handleClick() {
    checkOut(bookingId);
  }
  return (
    <Button
      variation="primary"
      size="small"
      onClick={handleClick}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
