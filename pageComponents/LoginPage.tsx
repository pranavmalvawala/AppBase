import React from "react";
import "./Login.css";
import { ErrorMessages } from "../components";
import { LoginResponseInterface, UserContextInterface, ApiName } from "../interfaces";
import { ApiHelper, UserHelper } from "../helpers";
import { Button, FormControl, Alert } from "react-bootstrap";
import { useParams, withRouter, RouteComponentProps, Redirect } from "react-router-dom";

interface Props extends RouteComponentProps { accessApi?: string, context: UserContextInterface, jwt: string, auth: string, successCallback?: () => void, requiredKeyName?: boolean, logoSquare?: string }
interface pathParams { token: string }

const Login: React.FC<Props> = (props) => {
    const [welcomeBackName, setWelcomeBackName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [redirectTo, setRedirectTo] = React.useState<string>("");
    const { token } = useParams<pathParams>();
    const handleKeyDown = (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(null);
        }
    };

    const validate = () => {
        var errors = [];
        if (email === "") errors.push("Please enter your email address.");
        if (password === "") errors.push("Please enter your password.");
        setErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e: React.MouseEvent) => {
        if (e !== null) e.preventDefault();
        if (validate()) login({ email: email, password: password });
    };

    const getCookieValue = (a: string) => {
        var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    };

    const init = () => {
        if (token !== undefined) { login({ jwt: token }); }
        if (props.auth !== "") login({ authGuid: props.auth });
        if (props.jwt !== "") {
            setEmail(getCookieValue("email"));
            setWelcomeBackName(getCookieValue("name"));
            login({ jwt: props.jwt });
        }
    };

    const handleLoginSuccess = (resp: LoginResponseInterface) => {
        if (Object.keys(resp).length !== 0) {
            UserHelper.churches = resp.churches;

            resp.churches.forEach((c) => {
                c.apis.forEach(api => {
                    if (api.keyName === ApiName.ACCESS_API) document.cookie = "jwt=" + api.jwt;
                })
            });

            if (UserHelper.churches.length > 0) {
                document.cookie = "name=" + resp.user.displayName;
                document.cookie = "email=" + resp.user.email;
                UserHelper.user = resp.user;
                selectChurch();
            } else handleLoginErrors(["No permissions"]);

            const search = new URLSearchParams(props.location.search);
            const returnUrl = search.get("returnUrl");
            if (returnUrl) {
                setRedirectTo(returnUrl);
            }
        }
    }

    const handleLoginErrors = (errors: string[]) => {
        setWelcomeBackName("");
        if (errors[0] === "No permissions") setErrors(["The provided login does not have access to this application."]);
        else setErrors(["Invalid login. Please check your email or password."]);
        setLoading(false);
    }

    const login = (data: any) => {
        setLoading(true);
        ApiHelper.postAnonymous("/users/login", data, "AccessApi")
            .then((resp: LoginResponseInterface) => {
                if (resp.errors !== undefined) handleLoginErrors(resp.errors);

                else handleLoginSuccess(resp);
            })
            .catch((e) => { setErrors([e.toString()]); setLoading(false); throw e; });
    };

    const selectChurch = async () => {
        if (props.requiredKeyName) {
            const keyName = window.location.hostname.split(".")[0];
            await UserHelper.selectChurch(props.context, undefined, keyName);
        }
        else await UserHelper.selectChurch(props.context);
        if (props.successCallback !== undefined) props.successCallback();
        else props.context.setUserName(UserHelper.currentChurch.id.toString());
    };

    const getWelcomeBack = () => {
        if (welcomeBackName === "") return null;
        else {
            return <Alert variant="info">Welcome back, <b>{welcomeBackName}</b>!  Please wait while we load your data.</Alert>
        }
    }

    React.useEffect(init, []);

    if (redirectTo) {
        return <Redirect to={redirectTo} />;
    }
    return (
        <div className="smallCenterBlock">
            <img src={props.logoSquare || '/images/logo-login.png'} alt="logo" className="img-fluid" />
            {token ? <Alert variant="info"> Please wait while we load your data.</Alert> :
                <>
                    <ErrorMessages errors={errors} />
                    {getWelcomeBack()}
                    <div id="loginBox">
                        <h2 data-cy="sign-in-call-to-action">Please sign in</h2>
                        <FormControl id="email" name="email" data-cy="email" value={email} onChange={(e) => { e.preventDefault(); setEmail(e.currentTarget.value); }} placeholder="Email address" onKeyDown={handleKeyDown} />
                        <FormControl id="password" name="password" data-cy="password" type="password" placeholder="Password" value={password} onChange={(e) => { e.preventDefault(); setPassword(e.currentTarget.value); }} onKeyDown={handleKeyDown} />
                        <Button id="signInButton" data-cy="sign-in-button" size="lg" variant="primary" block onClick={!loading ? handleSubmit : null} disabled={loading} >
                            {loading ? "Please wait..." : "Sign in"}
                        </Button>
                        <br />
                        <div className="text-right"><a href="/forgot">Forgot Password</a>&nbsp;</div>
                    </div>
                </>
            }
        </div>
    );

};

export const LoginPage = withRouter(Login);