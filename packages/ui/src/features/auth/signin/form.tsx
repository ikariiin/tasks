import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { Divider } from "../../../components/divider";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { PasswordVisibilityToggle } from "../../../components/input/password-visibility-toggle";

const Container = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "40vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(10),
}));

const Form = styled("form")(({ theme }) => ({
  margin: theme.spacing(0, 0, 2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));

const validationSchema = yup.object({
  username: yup.string().required("You can't leave this empty."),
  password: yup.string().required("You can't leave this empty."),
});

export const SigninForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema,
  });

  return (
    <Container>
      <Typography variant="h1">Welcome back!</Typography>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 6,
        }}
      >
        Continue with Google or enter your details.
      </Typography>
      <GoogleLogin
        render={(renderProps) => (
          <ButtonContainer>
            <Button
              onClick={renderProps.onClick}
              variant="outlined"
              fullWidth={false}
              size="large"
              color="primary"
            >
              Continue with Google
            </Button>
          </ButtonContainer>
        )}
        clientId="YOUR_CLIENT_ID"
      />
      <Divider>
        <Typography variant="body2">OR</Typography>
      </Divider>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <PasswordVisibilityToggle
                current={showPassword}
                change={setShowPassword}
              />
            ),
          }}
        />
        <Link to="/forgot-password">
          <Button
            variant="text"
            sx={{
              my: 2,
            }}
            color="secondary"
          >
            <Typography variant="body2">Forgot password?</Typography>
          </Button>
        </Link>
        <Button type="submit" variant="contained" fullWidth size="large">
          Sign in
        </Button>
      </Form>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        Don&apos;t have an account?{" "}
        <Link to="/signup">
          <Button variant="text" color="secondary">
            Sign up
          </Button>
        </Link>
      </Typography>
    </Container>
  );
};
