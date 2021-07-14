import React, { useState } from "react";
import "./PasswordField.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClass?: string;
};

export function PasswordField({ value = "", onChange, containerClass = "" }: Props) {
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
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Password"
        name="password"
        value={value}
        onChange={onChange}
      />
      {eyeIcon}
    </div>
  );
}
