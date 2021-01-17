import React from "react";
import "./Login.css";
import { ErrorMessages } from "../components";
import { LoginResponseInterface, UserContextInterface } from "../interfaces";
import { ApiHelper, UserHelper } from "../helpers";
import { Button, FormControl, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface Props { accessApi?: string, context: UserContextInterface, jwt: string, auth: string, defaultApi: string, successCallback?: () => void }

export const LoginPage: React.FC<Props> = (props) => {
    const [welcomeBackName, setWelcomeBackName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

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

        if (props.auth != "") {
            login({ authGuid: props.auth });
        }

        if (props.jwt !== "") {
            setEmail(getCookieValue("email"));
            setWelcomeBackName(getCookieValue("name"));
            login({ jwt: props.jwt });
        }
    };


    const handleLoginSuccess = (resp: LoginResponseInterface) => {
        if (Object.keys(resp).length !== 0) {
            var jwt = "";
            UserHelper.churches = [];

            resp.churches.forEach((c) => {
                var add = false;
                console.log(c);
                c.apis.forEach((api) => {
                    if (api.keyName === props.defaultApi) {
                        add = true;
                        if (jwt === "") jwt = api.jwt;
                    }
                });
                if (add) UserHelper.churches.push(c);
            });

            console.log(UserHelper.churches.length);
            if (UserHelper.churches.length > 0) {
                document.cookie = "jwt=" + jwt;
                document.cookie = "name=" + resp.user.displayName;
                document.cookie = "email=" + resp.user.email;
                ApiHelper.jwt = jwt;
                UserHelper.user = resp.user;
                selectChurch();
            }

        }
    }

    const handleLoginErrors = (errors: string[]) => {
        setWelcomeBackName("");
        if (errors[0] === "No permissions") setErrors(["This login does not have access to AccessApi."]);
        else setErrors(["Invalid login. Please check your email or password."]);
        setLoading(false);
    }


    const login = (data: any) => {
        setLoading(true);
        ApiHelper.apiPostAnonymous(props.accessApi + "/users/login", data)
            .then((resp: LoginResponseInterface) => {
                if (resp.errors !== undefined) handleLoginErrors(resp.errors);

                else handleLoginSuccess(resp);
            })
            .catch((e) => { setErrors([e.toString()]); throw e; });
    };

    const selectChurch = async () => {
        console.log("selectChurch");
        await UserHelper.selectChurch(UserHelper.churches[0].id, props.context, props.defaultApi);
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

    return (
        <div className="smallCenterBlock">
            <img
                src="/images/logo-login.png"
                alt="logo"
                className="img-fluid"
                style={{ marginBottom: 50 }}
            />
            <ErrorMessages errors={errors} />
            {getWelcomeBack()}
            <div id="loginBox">
                <h2>Please sign in</h2>
                <FormControl id="email" name="email" value={email} onChange={(e) => { e.preventDefault(); setEmail(e.currentTarget.value); }} placeholder="Email address" onKeyDown={handleKeyDown} />
                <FormControl id="password" name="password" type="password" placeholder="Password" value={password} onChange={(e) => { e.preventDefault(); setPassword(e.currentTarget.value); }} onKeyDown={handleKeyDown} />
                <Button id="signInButton" size="lg" variant="primary" block onClick={!loading ? handleSubmit : null} disabled={loading} >
                    {loading ? "Please wait..." : "Sign in"}
                </Button>
                <br />
                <div className="text-right">
                    <a href="/forgot">Forgot Password</a>&nbsp;
          </div>
            </div>
        </div>
    );

};
