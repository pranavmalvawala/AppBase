import React from "react";
import { LoginResponseInterface, RegisterUserInterface, UserInterface } from "../../interfaces";
import { ApiHelper } from "../../helpers";
import { Button, FormControl, Form } from "react-bootstrap";
import * as yup from "yup"
import { Formik, FormikHelpers } from "formik"

const schema = yup.object().shape({
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address."),
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name.")
})

interface Props {
  appName?: string,
  appUrl?: string,
  updateErrors: (errors: string[]) => void,
  userRegisteredCallback?: (user: UserInterface) => Promise<void>;
}


export const Register: React.FC<Props> = (props) => {
  const [registered, setRegistered] = React.useState(false);


  const handleRegisterErrors = (errors: string[]) => {
    props.updateErrors(errors)
  }

  const handleRegisterSuccess = (resp: LoginResponseInterface) => {
    setRegistered(true);
    if (props.userRegisteredCallback) props.userRegisteredCallback(resp.user);
  }

  const register = (data: RegisterUserInterface, helpers?: FormikHelpers<any>) => {
    props.updateErrors([])
    ApiHelper.postAnonymous("/users/register", data, "AccessApi")
      .then((resp: any) => {
        if (resp.errors) handleRegisterErrors(resp.errors);
        else handleRegisterSuccess(resp);
      })
      .catch((e) => { props.updateErrors([e.toString()]); throw e; })
      .finally(() => {
        helpers?.setSubmitting(false)
      });
  };

  //React.useEffect(init, []);

  const initialValues = { firstName: "", lastName: "", email: "", appName: props.appName, appUrl: props.appUrl }

  const getThankYou = () => {
    return (
      <>
        <p>Thank you for registering.  Please check your email for your temporary password in order to get started.</p>
        <p><a href="/login">Return to login</a></p>
      </>
    );
  }

  const getForm = () => {
    return (<Formik validationSchema={schema} initialValues={initialValues} onSubmit={register} >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <FormControl type="text" aria-label="firstName" id="firstName" name="firstName" value={values.firstName} onChange={handleChange} placeholder="First name" isInvalid={touched.firstName && !!errors.firstName} />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <FormControl type="text" aria-label="lastName" id="lastName" name="lastName" value={values.lastName} onChange={handleChange} placeholder="Last name" isInvalid={touched.lastName && !!errors.lastName} />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <FormControl type="text" aria-label="email" id="email" name="email" value={values.email} onChange={handleChange} placeholder="Email address" isInvalid={touched.email && !!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" id="signInButton" size="lg" variant="primary" block disabled={isSubmitting} style={{ width: "100%" }} >
            {isSubmitting ? "Please wait..." : "Register"}
          </Button>
        </Form>
      )}
    </Formik>);
  }

  if (registered) return getThankYou();
  else return getForm();


};
