import { Button, TextField, Stack, Typography, Alert } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { supabase } from "../data/supabase";

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if (data.get("password") !== data.get("password-again")) {
      setError("Passwords do not match.");
      return;
    }

    const response = await supabase.auth.signUp({
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
    <form style={{ margin: "0 auto", maxWidth: 400 }} onSubmit={handleRegister}>
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
        <TextField
          variant="outlined"
          type="password"
          name="password-again"
          placeholder="Password Again"
        />

        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Stack>
    </form>
  );
};
