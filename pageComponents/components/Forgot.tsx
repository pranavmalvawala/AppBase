import React from "react";
import { ApiHelper } from "../../helpers";
import { ErrorMessages } from "../../components";
import { ResetPasswordRequestInterface, ResetPasswordResponseInterface } from "../../interfaces";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup"
import { Formik, FormikHelpers } from "formik"

const schema = yup.object().shape({
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address.")
})

interface Props {
  registerCallback: () => void,
  loginCallback: () => void
}

export const Forgot: React.FC<Props> = props => {
  const [errors, setErrors] = React.useState([]);
  const [successMessage, setSuccessMessage] = React.useState<React.ReactElement>(null);

  const reset = ({ email }: { email: string }, helpers?: FormikHelpers<any>) => {
    let req: ResetPasswordRequestInterface = { userEmail: email };

    ApiHelper.postAnonymous("/users/forgot", req, "AccessApi").then((resp: ResetPasswordResponseInterface) => {
      if (resp.emailed) {
        setErrors([]);
        setSuccessMessage(<div className="alert alert-success" role="alert">Password reset email sent</div>);
      } else {
        setErrors(["We could not find an account with this email address"]);
        setSuccessMessage(<></>);
      }
      helpers?.setSubmitting(false);
    });
  }

  const initialValues = { email: "" }

  return (
    <>
      <p>Enter your email address to request a password reset.</p>
      <ErrorMessages errors={errors} />
      {successMessage}
      <Formik validationSchema={schema} initialValues={initialValues} onSubmit={reset}>
        {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                aria-label="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email address"
                isInvalid={touched.email && !!errors.email}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && reset}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" size="lg" variant="primary" block disabled={isSubmitting} style={{ width: "100%" }}>Reset</Button>
          </Form>
        )}
      </Formik>
      <br />
      <div className="text-right">
        <a href="about:blank" onClick={(e) => { e.preventDefault(); props.registerCallback(); }}>Register</a> &nbsp; | &nbsp;
        <a href="about:blank" onClick={(e) => { e.preventDefault(); props.loginCallback(); }}>Login</a>&nbsp;</div>

    </>
  );

}
