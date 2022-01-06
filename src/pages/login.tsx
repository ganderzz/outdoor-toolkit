import { Button, TextField, Stack, Typography } from "@mui/material";
import React from "react";
import { supabase } from "../data/supabase";

export const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(data);
    await supabase.auth.signIn({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  return (
    <form style={{ margin: "0 auto", maxWidth: 400 }} onSubmit={handleLogin}>
      <Stack spacing={1}>
        <Typography variant="h5">Login</Typography>
        <TextField variant="outlined" type="email" name="email" placeholder="Email Address" />
        <TextField variant="outlined" type="password" name="password" placeholder="Password" />
        <Button variant="contained" color="primary" type="submit">
          Sign in
        </Button>
      </Stack>
    </form>
  );
};
