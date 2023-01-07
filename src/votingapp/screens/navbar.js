import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { IMAGE } from "../../assets/assets";
import { LogoutContext } from "../context/Context";

const Navbar = () => {
  const { WTLogout, setWTLogout } = useContext(LogoutContext);

  return (
    <div className="navbar">
      <Container
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
			cursor:"pointer"
          }}
		  onClick={()=> window.location.href='/ucsdvote'}
        >
          <img
            src={IMAGE.king}
            style={{ width: 50, height: 50, position: "relative" }}
            alt={"icon"}
          />
          <h5
            style={{
              fontFamily: "Roboto-Bold",
              marginLeft: 5,
              marginTop: 12,
            }}
          >
            UCSD Vote
          </h5>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/download" className={"link"}>
            Download
          </Link>
          <Link to="/developer" className={"link"}>
            Developer
          </Link>
          <Link to="/about" className={"link"}>
            About
          </Link>
          <a href="https://www.ucsdawei.edu.mm/" className={"link"}>
            UCSD
          </a>
          <a
            className="link"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setWTLogout(true)}
          >
            Logout
          </a>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(Navbar);
