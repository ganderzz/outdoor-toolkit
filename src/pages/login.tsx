import { Button, TextField, Stack, Typography, Alert } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { supabase } from "../data/supabase";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const response = await supabase.auth.signIn({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

    if (response.error) {
      setError(response.error.message);
    } else {
      navigate("/");
    }
  };

  if (supabase.auth.session()) {
    return <Navigate to="/" />;
  }

  return (
    <form style={{ margin: "0 auto", maxWidth: 400 }} onSubmit={handleLogin}>
      <Stack spacing={1}>
        {error && (
          <Alert color="error" variant="outlined">
            {error}
          </Alert>
        )}
        <Typography variant="h5">Sign In</Typography>
        <TextField
          variant="outlined"
          type="email"
          name="email"
          placeholder="Email Address"
        />
        <TextField
          variant="outlined"
          type="password"
          name="password"
          placeholder="Password"
        />
        <Button variant="contained" color="primary" type="submit">
          Sign in
        </Button>

        <Button
          component={Link}
          to="/register"
          variant="outlined"
          color="primary"
        >
          Register
        </Button>
      </Stack>
    </form>
  );
};
