import React from "react";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import GearTable from "./components/gearTable";
import { useStores } from "./stores";
import { supabase } from "./data/supabase";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { RequireAuth } from "./components/auth/requireAuth";

function App() {
  const [session, setSession] = React.useState(null);
  const { GearStore } = useStores();

  React.useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  const signIn = async () => {
    const data = await supabase.auth.signIn({ email: "stolen3@gmail.com" }, { redirectTo: "/" });
    console.log(data);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        background: "#FAF8F4",
      }}
    >
      <BrowserRouter>
        <AppBar
          position="static"
          elevation={0}
          style={{
            background: "#000",
            color: "white",
            marginBottom: 40,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Outdoor Toolkit
            </Typography>

            {!session ? (
              <Button color="inherit" component={Link} to="/login">
                Sign In
              </Button>
            ) : (
              <Button color="inherit" onClick={signOut}>
                Sign Out
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <GearTable />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </section>
  );
}

export default observer(App);
