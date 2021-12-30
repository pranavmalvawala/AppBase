import React, { useState } from "react";
import { Form } from "react-bootstrap";

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
  errorText?: any;
};

export function PasswordField({
  value = "",
  containerClass = "",
  errorText = "",
  ...inputProps
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //const iconColor = showPassword ? "icon-grey" : "icon-lightgrey";

  const iconStyles: React.CSSProperties = { position: "absolute", cursor: "pointer", top: 12.5, right: 15, color: "lightgray" }
  if (showPassword) iconStyles.color = "grey";

  const eyeIcon = value && (

    <i
      className={`fas fa-eye`}
      style={iconStyles}
      onClick={() => setShowPassword(!showPassword)}
    />
  );
  return (
    <div className={`${containerClass}`.trim()} style={{ position: "relative" }}>
      <Form.Label htmlFor="password" style={{ display: "none" }}>
        Password
      </Form.Label>
      <Form.Control
        id="password"
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Password"
        name="password"
        value={value}
        {...inputProps}
        style={{ paddingRight: 50 }}
      />
      {eyeIcon}
      <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
    </div>
  );
}
