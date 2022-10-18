import { Box, styled, Typography } from "@mui/material";
import React from "react";
import SigninPoster from "../../../assets/images/signin-poster.jpg";
import { SigninForm } from "./form";

const Container = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
}));

const Poster = styled(Box)<{ image: string }>(({ image }) => ({
  height: "100%",
  backgroundSize: "cover",
  backgroundImage: `url(${image})`,
  backgroundPosition: "center",
  flexGrow: 1,
  borderRadius: "64px 0 0 64px",
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(7px)",
  borderRadius: "64px 0 0 64px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: theme.spacing(0, 12),
  textAlign: "right",
}));

export const Signin = () => {
  return (
    <Container>
      <SigninForm />
      <Poster image={SigninPoster}>
        <ImageOverlay>
          <Typography variant="h1" color="white">
            Tasks
          </Typography>
          <Typography variant="h6">
            A simple task management app for you and your team.
          </Typography>
        </ImageOverlay>
      </Poster>
    </Container>
  );
};
