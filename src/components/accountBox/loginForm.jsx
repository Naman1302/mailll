import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import {GoogleLogin} from "react-google-login";
import {login, loginByGoogle} from "../../actions/auth";


export function LoginForm(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    login(formData);
    
  };
  
  const responseGoogle = (response) => {
    console.log(response.profileObj);
    console.log(response.tokenId);
    if (response) {
      loginByGoogle({email : response.profileObj.email, token: response.tokenId});
    }
  };
  const responseFailGoogle = (response) => {
    console.log("failed google login:", response);
  };
  const loginWithGmail = (e) => {
    console.log("clicking lwg");
    document.getElementById("googleButton").childNodes[0].click();
  };
  
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" name="email" value={email} onChange={(e) => onChange(e) }/>
        <Input type="password" name="password" value={password} placeholder="Password" onChange={(e) => onChange(e) }/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forgot your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={onSubmit}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={loginWithGmail}>
          Log in with Google
        </BoldLink>
        <div style={{ display: 'none' }} id='googleButton'>
        <GoogleLogin
        clientId="382906126798-og7711la0b5in7hruilujrii68j9f2v4.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseFailGoogle}
        id="googleButton1"
        cookiePolicy={"single_host_origin"}
        />
        </div>
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

// const mapStateToProps = (state) => ({});

// export default connect(mapStateToProps, { login, loginByGoogle })(LoginForm);