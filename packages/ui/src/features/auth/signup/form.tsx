import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { Divider } from "../../../components/divider";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../../services/api/auth";
import { setAuth } from "../../../services/store/auth";
import { useAppDispatch } from "../../../services/store";
import { useSnackbar } from "material-ui-snackbar-provider";
import { LoadingButton } from "@mui/lab";
import { PasswordVisibilityToggle } from "../../../components/input/password-visibility-toggle";

// Styled components:

const Container = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "40vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(10, 18),
}));

const Form = styled("form")(({ theme }) => ({
  margin: theme.spacing(0, 0, 2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(2),
}));

const Title = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(36),
}));

// Validation Schema:

const validationSchema = yup.object({
  username: yup.string().required("You can't leave this empty."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("You can't leave this empty."),
  password: yup.string().required("You can't leave this empty."),
});

// Component:

export const SignupForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [signup] = useSignupMutation();
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const response = await signup(values).unwrap();
        dispatch(setAuth(response));
      } catch (error) {
        snackbar.showMessage("Could not sign you up. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema,
  });

  return (
    <Container>
      <Title>Glad to have you!</Title>
      <Typography
        variant="body2"
        sx={{
          marginBottom: 6,
        }}
      >
        Sign up with Google or enter your details.
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
              Sign up with Google
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
          disabled={submitting}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          variant="outlined"
          disabled={submitting}
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
          disabled={submitting}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          loading={submitting}
          loadingPosition="start"
        >
          Sign up
        </LoadingButton>
      </Form>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link to="/signin">
          <Button variant="text" color="secondary">
            Sign in
          </Button>
        </Link>
      </Typography>
    </Container>
  );
};
