import { Box, styled } from "@mui/material";
import SignupPoster from "../../../assets/images/signup-poster.jpg";
import React from "react";
import { SignupForm } from "./form";

const Container = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
}));

const Poster = styled("img")<{ image: string }>(({ image }) => ({
  height: "100%",
  backgroundSize: "cover",
  backgroundImage: `url(${image})`,
  backgroundPosition: "center",
  flexGrow: 1,
  borderRadius: "64px 0 0 64px",
}));

export const Signup = () => {
  return (
    <Container>
      <SignupForm />
      <Poster image={SignupPoster} />
    </Container>
  );
};
