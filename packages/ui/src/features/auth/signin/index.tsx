import { Box, styled } from "@mui/material";
import React from "react";
import SigninPoster from "../../../assets/images/signin-poster.jpg";
import { SigninForm } from "./form";

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

export const Signin = () => {
  return (
    <Container>
      <SigninForm />
      <Poster image={SigninPoster} />
    </Container>
  );
};
