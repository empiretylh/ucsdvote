import React, { useState, useMemo } from "react";
import axios from "axios";
import { baseURL } from "./data/data";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
 
} from "react-router-dom";

import Home from "./screens/home";
import Login from "./screens/login";
import Selection from "./screens/selection";
import { useEffect } from "react";
import services from "./data/services";
import "./main.css";
import "../fonts/Roboto-Black.ttf";
import "../fonts/Roboto-BlackItalic.ttf";
import "../fonts/Roboto-Bold.ttf";
import "../fonts/Roboto-BoldItalic.ttf";
import "../fonts/Roboto-Italic.ttf";
import "../fonts/Roboto-Light.ttf";
import "../fonts/Roboto-LightItalic.ttf";
import "../fonts/Roboto-Medium.ttf";
import "../fonts/Roboto-MediumItalic.ttf";
import "../fonts/Roboto-Regular.ttf";
import "../fonts/Roboto-Thin.ttf";
import "../fonts/Roboto-ThinItalic.ttf";
import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
  Card,
} from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  TokenContext,
  VotingCodeContext,
  LogoutContext,
} from "./context/Context";
import NavBar from "./screens/navbar";
const queryClient = new QueryClient();
axios.defaults.baseURL = baseURL;


const VotingMain = () => {
  const [token, setToken] = useState(null);
  const [votingcode, setVotingCode] = useState(0);

  const [WTLogout, setWTLogout] = useState(false);

  useEffect(() => {
    // services.logout();
    const current_token = services.getCurrentUserToken();
    if (current_token) {
      axios.defaults.headers.common = {
        Authorization: `Token ${current_token}`,
      };
    } else {
      axios.defaults.headers.common = {
        Authorization: null,
      };
    }
    setToken(current_token);
  }, [token]);

  const tokenValue = useMemo(() => ({ token, setToken }), [token, setToken]);
  const vc_value = useMemo(
    () => ({ votingcode, setVotingCode }),
    [votingcode, setVotingCode]
  );

  const Logout = () => {
    window.location.href='/';
    services.logout();
    setToken(null);
    setWTLogout(false);
  
  };

  const logoutvalue = useMemo(
    () => ({ WTLogout, setWTLogout }),
    [WTLogout, setWTLogout]
  );

  return (
    <LogoutContext.Provider value={logoutvalue}>
      <VotingCodeContext.Provider value={vc_value}>
        <div>
          <QueryClientProvider client={queryClient}>
            <TokenContext.Provider value={tokenValue}>
              <HashRouter>
                {token === null ? null : <NavBar />}
                <Routes>
                  {token === null ? (
                    <>
                      <Route path="/" element={<Login />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<Home />} />
                      <Route path="/selection" element={<Selection />} />
                    </>
                  )}
                </Routes>
              </HashRouter>
            </TokenContext.Provider>
          </QueryClientProvider>
        </div>
      </VotingCodeContext.Provider>
      <Modal
        show={WTLogout}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Modal.Title>Logout</Modal.Title>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>
              Are you sure want to logout from this account. If you want to use
              this account, you need to remember your username and password.
            </p>
          </div>
          <Modal.Footer>
            <Button variant={"danger"} onClick={()=>Logout()}>Yes, I want to Logout Now</Button>
            <Button variant={"primary"} onClick={() => setWTLogout(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </LogoutContext.Provider>
  );
};

export default VotingMain;
