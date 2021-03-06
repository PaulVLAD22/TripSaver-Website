import React, { useState } from "react";
import { FcGlobe } from "react-icons/fc";
import {
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Container,
} from "@chakra-ui/react";

type Props = {
  Signup:Function;
  setPage:Function;
  error:string;
}

const SignupForm = ({Signup,setPage,error}:Props):JSX.Element => {
  const [details, setDetails] = useState({ email: "", password: "", confirmPassword:"" });

  const submitHandler = (e:React.FormEvent) => {
    e.preventDefault();
    Signup(details)
  };
  return (
    <div style={{ width: "100vw", height: "100vh",background:"linear-gradient(45deg, rgba(12,24,21,1) 0%, rgba(20,99,89,1) 100%)" }}>
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={submitHandler}>
          <Container
            width="min(400px,100vw)"
            boxShadow="2xl"
            p="10"
            borderRadius="10"
            centerContent={true}
            border="1px"
            borderColor="teal.300"
            backgroundColor="white"
          >
            <Text
              letterSpacing="5px"
              p="5"
              fontWeight="semibold"
              fontSize="5xl"
              color="teal"
            >
              Kite
              <FcGlobe style={{ display: "inline-block" }} />
            </Text>
            {error != "" && (
              <Text fontSize="lg" color={"teal.600"}>{error}</Text>
            )}
            <FormControl>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <Input
                required={true}
                size="md"
                variant="filled"
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setDetails({ ...details, email: e.target.value });
                }}
                value={details.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                required={true}
                size="md"
                variant="filled"
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setDetails({ ...details, password: e.target.value });
                }}
                value={details.password}
              />
            </FormControl>
            <FormControl >
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                required={true}
                size="md"
                variant="filled"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={(e) => {
                  setDetails({ ...details, confirmPassword: e.target.value });
                }}
                value={details.confirmPassword}
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" size="md" type="submit">
              Sign up
            </Button>
            <Button mt={4} size="sm" onClick={()=>setPage("login")}>Log in</Button>
          </Container>
        </form>
      </div>
    </div>
  );
}

export default SignupForm

