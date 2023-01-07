import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Android2, QuestionCircle } from "react-bootstrap-icons";
import { IMAGE as I } from "../../assets/assets";
const Download = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 style={{ fontFamily: "Roboto-Bold" }}>
                Choose Your King and Queen Today.
              </h1>
              <p style={{ fontFamily: "Roboto-Regular" }}>
                This app is only avaible for
                andriod. We are working for IOS, too. Thank you for your
                understanding.
              </p>
              <h4>SYSTEM REQUIREMENTS</h4>
              <p>
                Andriod Version: 5.1+
                <br />
                RAM: 512MB+
                <br />
                Size: 27MB
                <br />
                Version: 1.0
              </p>
              <h4>ANDROID PERMISSIONS</h4>
              <p>
               Camera Access (QRCode Scanning)
                <br />
                Internet Access
    
              </p>
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    window.open(
                      "https://github.com/empiretylh/empire/raw/main/Voting/UCSD%20Voting.apk"
                    );
                  }}
                >
                  <Android2 size={20} style={{ marginRight: 8 }} />
                  Download App
                </Button>
                <Button
                  variant="outline-black"
                  style={{ marginLeft: 10 }}
                  onClick={() => {}}
                >
                  <QuestionCircle size={20} style={{ marginRight: 8 }} />
                  How to Vote
                </Button>
              </div>
            </div>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <img src={I.ph1} style={{ width: 300 }} />
            <img src={I.ph2} style={{ width: 200 }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Download;
