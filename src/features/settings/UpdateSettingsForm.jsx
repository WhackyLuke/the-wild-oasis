import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../UI/Spinner";

import { useSettings } from "./useSettings";

import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { register, handleSubmit, formState } = useForm();
  const { updateSettings, isUpdating } = useUpdateSettings();
  const { errors } = formState;

  if (isLoading) return <Spinner />;

  const {
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
    breakfastPrice,
  } = settings;

  function onSubmit(data) {
    const newSettings = {
      minBookingLength: data["min-nights"],
      maxBookingLength: data["max-nights"],
      maxGuestsPerBooking: data["max-guests"],
      breakfastPrice: data["breakfast-price"],
    };
    updateSettings(newSettings);
  }
  function onError(error) {
    console.error(`FORM ERROR - ${error}`);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        error={errors?.["min-nights"]?.message}
        label="Minimum nights/booking"
      >
        <Input
          // onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register("min-nights", {
            required: "This field is required",
            validate: (value) => value > 0 || "Positive number required",
          })}
        />
      </FormRow>
      <FormRow
        error={errors?.["max-nights"]?.message}
        label="Maximum nights/booking"
      >
        <Input
          // onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          {...register("max-nights", {
            required: "This field is required",
            validate: (value) => value > 0 || "Positive number required",
          })}
        />
      </FormRow>
      <FormRow
        error={errors?.["max-guests"]?.message}
        label="Maximum guests/booking"
      >
        <Input
          // onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking ")}
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking || ""}
          {...register("max-guests", {
            required: "This field is required",
            validate: (value) => value > 0 || "Positive number required",
          })}
        />
      </FormRow>
      <FormRow
        error={errors?.["breakfast-price"]?.message}
        label="Breakfast price"
      >
        <Input
          // onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice || ""}
          {...register("breakfast-price", {
            required: "This field is required",
            validate: (value) => value > 0 || "Positive number required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="primary">Submit</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
