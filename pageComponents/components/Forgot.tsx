import React, { FormEventHandler } from "react";
import { ApiHelper } from "../../helpers";
import { ErrorMessages } from "../../components";
import { ResetPasswordRequestInterface, ResetPasswordResponseInterface } from "../../interfaces";
import { Button, Stack, TextField, Box } from "@mui/material";

interface Props {
  registerCallback: () => void,
  loginCallback: () => void
}

export const Forgot: React.FC<Props> = props => {
  const [errors, setErrors] = React.useState([]);
  const [successMessage, setSuccessMessage] = React.useState<React.ReactElement>(null);
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  }

  const validateEmail = (email: string) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email))

  const validate = () => {
    const result = [];
    if (!email) result.push("Please enter your email address.");
    else if (!validateEmail(email)) result.push("Please enter a valid email address.");
    setErrors(result);
    return result.length === 0;
  }

  const reset: FormEventHandler = (e) => {
    if (validate()) {
      setIsSubmitting(true);
      let req: ResetPasswordRequestInterface = { userEmail: email };
      ApiHelper.postAnonymous("/users/forgot", req, "AccessApi").then((resp: ResetPasswordResponseInterface) => {
        if (resp.emailed) {
          setErrors([]);
          setSuccessMessage(<div className="alert alert-success" role="alert">Password reset email sent</div>);
        } else {
          setErrors(["We could not find an account with this email address"]);
          setSuccessMessage(<></>);
        }
      }).finally(() => { setIsSubmitting(false); });
    }
    e.preventDefault();
  }

  return (
    <form onSubmit={reset}>
      <p>Enter your email address to request a password reset.</p>
      <ErrorMessages errors={errors} />
      {successMessage}
      <TextField fullWidth autoFocus label="Email" aria-label="email" id="email" name="email" value={email} onChange={handleChange} placeholder="Email address" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && reset} />
      <br />
      <Box sx={{textAlign: "right", marginY: 1 }}>
        <a href="about:blank" className="text-decoration" onClick={(e) => { e.preventDefault(); props.registerCallback(); }}>Register</a> &nbsp; | &nbsp;
        <a href="about:blank" className="text-decoration" onClick={(e) => { e.preventDefault(); props.loginCallback(); }}>Login</a>&nbsp;
      </Box>
      <Stack direction="row" sx={{ marginTop: 1.5 }} spacing={1} justifyContent="end">
        <Button variant="contained" type="submit" disabled={isSubmitting}>Reset</Button>
      </Stack>
    </form>
  );
}
