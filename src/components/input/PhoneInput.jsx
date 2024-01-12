/* eslint-disable react/prop-types */
import React from "react";
import { useController } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import css from "./style.module.css";

export default function PhoneInputComponent({
  name = "",
  control,
  rules = {},
  defaultCountry = "RW",
  id = "",
}) {
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  // Ensure 'value' is always a string
  const sanitizedValue = typeof value === 'string' ? value : '';

  return (
    <>
      <label htmlFor={id ?? name} className={css.input}>
        <PhoneInput
          inputProps={{
            id: id ?? name,
            name,
            maxLength: 16,
            minLength: 16,
          }}
          country={defaultCountry}
          value={sanitizedValue}  
          onChange={onChange}
        />
      </label>
      {invalid && error && (
        <p style={{ color: 'red', fontSize: 'small' }}>{error.message}</p>
      )}
    </>
  );
}
