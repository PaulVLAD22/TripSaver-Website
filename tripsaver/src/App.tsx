import { ChakraProvider } from '@chakra-ui/react';
import React, {useState} from 'react'

import LoginForm from './components/login/LoginForm';
import SignupForm from './components/login/SignupForm';
import Dashboard from './components/Dashboard'
import axios from 'axios'

function App() {

  const [user, setUser] = useState({email:"",uid:0});
  const [error, setError] = useState("");
  const [pageToDisplay,setPageToDisplay]=useState("login")
  //const api="https://605c88b16d85de00170da6c9.mockapi.io/";


  type DetailsLogin={
    email:string;
    password:string;
  }
  type DetailsSignup={
    email:string;
    password:string;
    confirmPassword:string;
  }

  const Login = async ({email, password}:DetailsLogin) =>{

    setUser({email:email,uid:0})

    // geting user id
    // await axios({
    //   method: 'POST',
    //   url: api+"login",
    //   data: {
    //     email:details.email,
    //     password:details.password
    //   }
    // }).then((response)=>{
    //   let postResponse = response;
    //   console.log(postResponse)
    //   uid=postResponse.data.userId
    // },(postError)=>{
    //   setError("Wrong Details");
    //   console.log(postError)
    //   return
    // })
    
    // getting user data by id
    // await axios({
    //   method: 'GET',
    //   url: api+"user/"+uid,
    //   data: {
    //     email:details.email,
    //     password:details.password
    //   }
    // }).then((response)=>{
    //   console.log(response)
    //   setUser({email:response.data.email,name:response.data.name,uid:uid})

    // },(getError)=>{
    //   setError("Wrong Details");
    //   console.log(getError)
    // })
  
  }

  const Logout = () => {
    setUser({email:"",uid:0})
    
  }

  const Signup = async ({email, password, confirmPassword}:DetailsSignup) =>{
    if (password!=confirmPassword){
      setError("Passwords don't match");
    }
    // await axios({
    //   method: 'post',
    //   url: api+"user",
    //   data: {
    //     email:details.email,
    //     password:details.password
    //   }
    // }).then((response)=>{
    //   console.log(response)
    //   setPageToDisplay("login");
    // },(postError)=>{
    //   console.log(postError)
    // })
  }

  return (
    <ChakraProvider>
      <div className="App">
        {user.email!=""?
        <div className="welcome">
          <Dashboard email={user.email} logout={Logout}></Dashboard>
        </div>
        :
        
        pageToDisplay=="login" ?
          <LoginForm Login={Login} setPage={setPageToDisplay} error={error}/>
        :
          <SignupForm Signup={Signup} setPage={setPageToDisplay}error={error}></SignupForm>
        }
      </div>
    </ChakraProvider>
  );
}

export default App;
