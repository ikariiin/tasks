import { Box, styled, Typography } from "@mui/material";
import SignupPoster from "../../../assets/images/signup-poster.jpg";
import React from "react";
import { SignupForm } from "./form";

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
  borderRadius: "0",
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(7px)",
  borderRadius: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: theme.spacing(0, 12),
  textAlign: "right",
}));

export const Signup = () => {
  return (
    <Container>
      <SignupForm />
      <Poster image={SignupPoster}>
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
