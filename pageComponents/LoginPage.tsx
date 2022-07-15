import * as React from "react";
import { ErrorMessages, FloatingSupport, InputBox, Loading } from "../components";
import { LoginResponseInterface, UserContextInterface, ChurchInterface, UserInterface } from "../interfaces";
import { ApiHelper, ArrayHelper, UserHelper } from "../helpers";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie"
import jwt_decode from "jwt-decode"
import { Register } from "./components/Register"
import { SelectChurchModal } from "./components/SelectChurchModal"
import { Forgot } from "./components/Forgot";
import { TextField, Alert, Box, Typography } from "@mui/material";

interface Props {
  context: UserContextInterface,
  jwt: string, auth: string,
  keyName?: string,
  logo?: string,
  appName?: string,
  appUrl?: string,
  returnUrl?: string,
  loginSuccessOverride?: () => void,
  userRegisteredCallback?: (user: UserInterface) => Promise<void>;
  churchRegisteredCallback?: (church: ChurchInterface) => Promise<void>;
  callbackErrors?: string[];
}

export const LoginPage: React.FC<Props> = (props) => {
  const [welcomeBackName, setWelcomeBackName] = React.useState("");
  const [pendingAutoLogin, setPendingAutoLogin] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [redirectTo, setRedirectTo] = React.useState<string>("");
  const [cookies, setCookie] = useCookies(["jwt", "name", "email"]);
  const [showForgot, setShowForgot] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showSelectModal, setShowSelectModal] = React.useState(false);
  const [loginResponse, setLoginResponse] = React.useState<LoginResponseInterface>(null)
  const [userJwt, setUserJwt] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loginFormRef = React.useRef(null);
  const location = typeof window !== "undefined" && window.location;
  let selectedChurchId = "";
  let registeredChurch: ChurchInterface = null;
  let userJwtBackup = ""; //use state copy for storing between page updates.  This copy for instant availability.

  React.useEffect(() => {
    if (props.callbackErrors?.length > 0) {
      setErrors(props.callbackErrors)
    }
  }, [props.callbackErrors])

  const init = () => {
    const search = new URLSearchParams(location?.search);
    const action = search.get("action");
    if (action === "forgot") setShowForgot(true);
    else if (action === "register") setShowRegister(true);
    else {
      if (props.auth) {
        login({ authGuid: props.auth });
      } else if (props.jwt) {
        setWelcomeBackName(cookies.name);
        login({ jwt: props.jwt });
      } else {
        setPendingAutoLogin(true);
      }
    }
  };

  const handleLoginSuccess = async (resp: LoginResponseInterface) => {
    userJwtBackup = resp.user.jwt;
    setUserJwt(userJwtBackup);
    ApiHelper.setDefaultPermissions(resp.user.jwt);
    setLoginResponse(resp)
    resp.churches.forEach(church => { if (!church.apis) church.apis = []; });
    UserHelper.churches = resp.churches;

    setCookie("name", `${resp.user.firstName} ${resp.user.lastName}`, { path: "/" });
    setCookie("email", resp.user.email, { path: "/" });
    UserHelper.user = resp.user;

    if (props.jwt) {
      const decoded: any = jwt_decode(userJwtBackup)
      selectedChurchId = decoded.churchId
    }

    //Not needed - handled in continuedLoginProcess
    //ApiHelper.patch(`/userChurch/${UserHelper.user.id}`, { churchId: selectedChurchId, appName: props.appName }, "AccessApi")

    const search = new URLSearchParams(location?.search);
    const churchIdInParams = search.get("churchId");

    if (props.keyName) selectChurchByKeyName();
    else if (selectedChurchId) selectChurchById();
    else if (churchIdInParams) {
      selectChurch(churchIdInParams);
    } else {
      setShowSelectModal(true);
    }
  }

  const selectChurchById = async () => {
    await UserHelper.selectChurch(props.context, selectedChurchId, undefined);
    if (props.churchRegisteredCallback && registeredChurch) {
      props.churchRegisteredCallback(registeredChurch).then(() => {
        registeredChurch = null;
        login({ jwt: userJwt || userJwtBackup });
      });
    } else continuedLoginProcess();
  }

  const selectChurchByKeyName = async () => {
    if (!ArrayHelper.getOne(UserHelper.churches, "subDomain", props.keyName)) {
      const church: ChurchInterface = await ApiHelper.post("/churches/select", { subDomain: props.keyName }, "AccessApi");
      UserHelper.setupApiHelper(church);
      //create/claim the person record and relogin
      const personClaim = await ApiHelper.get("/people/claim/" + church.id, "MembershipApi");
      await ApiHelper.post("/userChurch/claim", { encodedPerson: personClaim.encodedPerson }, "AccessApi");
      login({ jwt: userJwt || userJwtBackup });
      return;
    }
    await UserHelper.selectChurch(props.context, undefined, props.keyName);
    continuedLoginProcess()
    return;
  }

  function continuedLoginProcess() {
    if (UserHelper.currentChurch) {
      UserHelper.currentChurch.apis.forEach(api => {
        if (api.keyName === "AccessApi") setCookie("jwt", api.jwt, { path: "/" });
      })
      try {
        if (UserHelper.currentChurch.id) ApiHelper.patch(`/userChurch/${UserHelper.user.id}`, { churchId: UserHelper.currentChurch.id, appName: props.appName, lastAccessed: new Date() }, "AccessApi")
      } catch (e) {
        console.log("Could not update user church accessed date")
      }
    }

    const search = new URLSearchParams(location?.search);
    const returnUrl = search.get("returnUrl") || props.returnUrl;
    if (returnUrl) setRedirectTo(returnUrl);

    if (props.loginSuccessOverride !== undefined) props.loginSuccessOverride();
    else {
      props.context.setUser(UserHelper.user);
      props.context.setChurches(UserHelper.churches)
      props.context.setChurch(UserHelper.currentChurch)
      ApiHelper.get(`/people/${UserHelper.currentChurch.personId}`, "MembershipApi").then(p => { props.context.setPerson(p); });
    }
  }

  async function selectChurch(churchId: string) {
    try {
      setErrors([])
      selectedChurchId = churchId;
      if (!ArrayHelper.getOne(UserHelper.churches, "id", churchId)) {
        const church: ChurchInterface = await ApiHelper.post("/churches/select", { churchId: churchId }, "AccessApi");
        UserHelper.setupApiHelper(church);

        //create/claim the person record and relogin
        const personClaim = await ApiHelper.get("/people/claim/" + churchId, "MembershipApi");
        await ApiHelper.post("/userChurch/claim", { encodedPerson: personClaim.encodedPerson }, "AccessApi");
        login({ jwt: userJwt || userJwtBackup });
        return;
      }

      UserHelper.selectChurch(props.context, churchId, null).then(() => {
        continuedLoginProcess()
      });
    } catch (err) {
      console.log("Error in selecting church: ", err)
      setErrors(["Error in selecting church. Please verify and try again"])
      loginFormRef?.current?.setSubmitting(false);
    }

  }

  const handleLoginErrors = (errors: string[]) => {
    setWelcomeBackName("");
    console.log(errors);
    setErrors(["Invalid login. Please check your email or password."]);
  }

  const validateEmail = (email: string) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email))

  const validate = () => {
    const result = [];
    if (!email) result.push("Please enter your email address.");
    else if (!validateEmail(email)) result.push("Please enter a valid email address.");
    if (!password) result.push("Please enter your password.");
    setErrors(result);
    return result.length === 0;
  }

  const submitLogin = () => {
    if (validate()) login({ email, password });
  }

  const login = (data: any) => {
    setErrors([])
    setIsSubmitting(true);
    ApiHelper.postAnonymous("/users/login", data, "AccessApi")
      .then((resp: LoginResponseInterface) => {
        setIsSubmitting(false);
        handleLoginSuccess(resp);
      })
      .catch((e) => {
        setPendingAutoLogin(true);
        handleLoginErrors(e.toString());
        setIsSubmitting(false);
      });

  };

  const getWelcomeBack = () => {
    if (welcomeBackName === "") return null;
    else {
      return <><Alert severity="info">Welcome back, <b>{welcomeBackName}</b>!  Please wait while we load your data.</Alert><Loading /></>;
    }
  }

  const getCheckEmail = () => {
    const search = new URLSearchParams(location?.search);
    if (search.get("checkEmail") === "1") return <Alert severity="info"> Thank you for registering.Please check your email for your temporary password.</Alert>
  }

  const handleShowRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRegister(true);
  }

  const getRegisterLink = () => (
    <><a href="about:blank" className="text-decoration" onClick={handleShowRegister}>Register</a> &nbsp; | &nbsp; </>
  )

  const handleRegisterCallback = () => {
    setShowForgot(false);
    setShowRegister(true);
  }

  const handleLoginCallback = () => {
    setShowForgot(false);
    setShowRegister(false);
  }

  const getLoginBox = () => (
    <>
      <InputBox headerText="Please Sign In" saveFunction={submitLogin} saveButtonType="submit" saveText={isSubmitting ? "Please wait..." : "Sign in"} isSubmitting={isSubmitting}>
        <TextField fullWidth autoFocus name="email" type="email" label="Email" value={email} onChange={(e) => { e.preventDefault(); setEmail(e.target.value) }} />
        <TextField fullWidth name="email" type="password" label="Password" value={password} onChange={(e) => { e.preventDefault(); setPassword(e.target.value) }} />
        <Box sx={{ textAlign: "right", marginY: 1 }}>
          {getRegisterLink()}
          <a href="about:blank" className="text-decoration" onClick={(e) => { e.preventDefault(); setShowForgot(true); }}>Forgot Password</a>&nbsp;
        </Box>
      </InputBox>
    </>
  )

  const getLoginRegister = () => {
    if (showRegister) return (
      <Box id="loginBox" sx={{ backgroundColor: "#FFF", border: "1px solid #CCC", borderRadius: "5px", padding: "20px" }}>
        <Typography component="h2" sx={{fontSize: "32px", fontWeight: 500, lineHeight: 1.2, margin: "0 0 8px 0"}}>Create an Account</Typography>
        <Register updateErrors={setErrors} appName={props.appName} appUrl={props.appUrl} loginCallback={handleLoginCallback} userRegisteredCallback={props.userRegisteredCallback} />
      </Box>
    );
    if (showForgot) return (
      <Box id="loginBox" sx={{ backgroundColor: "#FFF", border: "1px solid #CCC", borderRadius: "5px", padding: "20px" }}>
        <Typography component="h2" sx={{fontSize: "32px", fontWeight: 500, lineHeight: 1.2, margin: "0 0 8px 0"}}>Reset Password</Typography>
        <Forgot registerCallback={handleRegisterCallback} loginCallback={handleLoginCallback} />
      </Box>
    );
    else return getLoginBox();
  }

  const handleChurchRegistered = (church: ChurchInterface) => {
    registeredChurch = church;
  }

  React.useEffect(init, []); //eslint-disable-line

  if (redirectTo) return <Navigate to={redirectTo} />;
  else return (
    <Box sx={{maxWidth: "382px"}} px="16px" mx="auto">
      <img src={props.logo || "/images/logo-login.png"} alt="logo" style={{ width: "100%", marginTop: 100, marginBottom: 60 }} />
      <ErrorMessages errors={errors} />
      {getWelcomeBack()}
      {getCheckEmail()}
      {pendingAutoLogin && getLoginRegister()}
      <SelectChurchModal show={showSelectModal} churches={loginResponse?.churches} selectChurch={selectChurch} registeredChurchCallback={handleChurchRegistered} errors={errors} appName={props.appName} />
      <FloatingSupport appName={props.appName} />
    </Box>
  );

};

