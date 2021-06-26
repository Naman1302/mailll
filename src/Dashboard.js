import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
//import { useHistory } from "react-dom";
import { connect } from "react-redux";



const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Dashboard = ({isAuthenticated, user}) =>{

    //const history=useHistory();
    console.log(isAuthenticated);
useEffect(()=> {
    if(isAuthenticated) 
    console.log(isAuthenticated);
   // history.push("/home");
});


  return (
    <AppContainer>
      <AccountBox />

    </AppContainer>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps)(Dashboard);
