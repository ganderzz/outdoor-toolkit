import React from "react";
import { AppBar, Toolbar, Typography, Container, Button, Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "./stores";
import { supabase } from "./data/supabase";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { RequireAuth } from "./components/auth/requireAuth";
import { MyGearPage } from "./pages/myGear";
import { Register } from "./pages/register";
import { NavItem } from "./components/navItem/navItem";

function App() {
  const [session, setSession] = React.useState(null);
  const { GearStore } = useStores();

  React.useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

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
            background: "#111",
            color: "white",
            marginBottom: 40,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ marginRight: 8 }}>
              Outdoor Toolkit
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex", height: "100%" }}>
              <NavItem to="/">My Gear</NavItem>
              <NavItem to="/test">Test</NavItem>
            </Box>

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
                  <MyGearPage />
                </RequireAuth>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </section>
  );
}

export default observer(App);
