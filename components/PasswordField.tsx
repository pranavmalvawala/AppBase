import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./PasswordField.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClass?: string;
  id?: string;
  name?: string;
  "data-cy"?: string;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
  isInvalid?: boolean;
  errorText?: string;
};

export function PasswordField({
  value = "",
  containerClass = "",
  errorText = "",
  ...inputProps
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const iconColor = showPassword ? "icon-grey" : "icon-lightgrey";

  const eyeIcon = value && (
    <i
      className={`fas fa-eye ${iconColor}`}
      onClick={() => setShowPassword(!showPassword)}
    />
  );
  return (
    <div className={`${containerClass} pwd-container`.trim()}>
      <Form.Control
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Password"
        name="password"
        value={value}
        {...inputProps}
      />
      {eyeIcon}
      <Form.Control.Feedback type="invalid">
        {errorText}
      </Form.Control.Feedback>
    </div>
  );
}
