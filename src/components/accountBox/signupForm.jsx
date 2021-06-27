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
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";

export function SignupForm() {
  const { switchToSignin } = useContext(AccountContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [confPass, setconfPass] = useState({
  //   confpass: ""
  // });
  const { email, password } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    //wlkdnnd nhii horaaa
    axios.post("/register", formData).then(res=> {
      console.log(res);
      
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });
    toast.success("User Added", {
      position: "bottom-center",
      autoClose:2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    }

    ). catch((err)=> {
      console.log(err);
      dispatch({
        type: "REGISTER_FAIL"
      });
      toast.error("Register Failed", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    });
  }



  //   //register(formData);
    
  // }
//}
  // const same=false;
  // const Check = (e) => {
  //   setconfPass({ ...confPass, [e.target.name]: e.target.value });
  //   if(confPass.confpass!=formData.password) same=false;

  //   else same=true;
  // }
  
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" name="email" value={email} onChange={(e)=>onChange(e)}/>
        <Input type="password" placeholder="Password" name="password" value={password} onChange={(e)=>onChange(e)}/>
        <Input type="password" placeholder="Confirm Password" />
     {/* // {(same) ? null : <div> Passwords dont match </div>} */}
       </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={onSubmit}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}