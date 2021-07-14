import React, { useState } from "react";
import "./PasswordField.css";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PasswordField({ value = "", onChange }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const iconColor = showPassword ? "" : "icon-lightgrey";

  const eyeIcon = value && (
    <i
      className={`fas fa-eye ${iconColor}`}
      onClick={() => setShowPassword(!showPassword)}
    />
  );
  return (
    <div className="form-group pwd-container">
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
