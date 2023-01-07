import React, { useRef, useState, useContext, useMemo, useEffect } from "react";

import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  ButtonGroup,
  ToggleButton,
  Button,
  Modal,
  Card,
} from "react-bootstrap";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

import services from "../data/services";
import { TokenContext, VotingCodeContext } from "../context/Context";
import { useMutation, useQuery } from "react-query";
import QRCode from "react-qr-code";
import { IMAGE as I } from "../../assets/assets";

import {
  Bag,
  Boxes,
  CloudArrowUp,
  Search,
  Clock,
  Wallet,
  Trash,
  Images,
  Pencil,
  XCircle,
} from "react-bootstrap-icons";
import axios from "axios";
import ImageUpload from "./ImageUpload";

function formatMilliseconds(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return milliseconds >= 0
    ? `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${
        seconds % 60
      } seconds`
    : "Finished time";
}

function CountdownTimer(props) {
  const { startDate, endDate } = props;

  // console.log(startDate,endDate,'WHsodjfoajsdokfjojs;kdjf')
  const [timeLeft, setTimeLeft] = useState(
    endDate.getTime() - startDate.getTime()
  ); // Initialize timeLeft to the difference between the start and end dates

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft >= 0) {
        setTimeLeft(timeLeft - 1000);
      } // Decrement timeLeft by 1000 milliseconds (1 second)
    }, 1000); // Update timeLeft every second

    return () => clearInterval(timer); // Clean up the timer when the component unmounts
  }, [timeLeft]); // Only re-run the effect when timeLeft changes

  return <div>{formatMilliseconds(timeLeft)}</div>;
}

const QRCard = React.memo(({ item, Ondelete, onImageOpen, onEdit }) => {
  const [deleteShow, setDeleteShow] = useState(false);

  return (
    <Card style={{ width: 185 }}>
      <Modal
        show={deleteShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginLeft: 10 }}>
              <h4 style={{ fontFamily: "Roboto-Bold" }}>
                Are you sure want to Delete.
              </h4>
              <p style={{ color: "black" }}>
                Its will delete all the datas that are belong to.
              </p>
            </div>
          </div>
          <Modal.Footer>
            <Button
              variant={"danger"}
              onClick={() => {
                setDeleteShow(false);
                Ondelete(item);
              }}
            >
              Yes, I want to Delete.
            </Button>
            <Button variant={"primary"} onClick={() => setDeleteShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <img
        src={axios.defaults.baseURL + item.profileimage}
        alt={item.name}
        className="profileLarge"
      />

      <Card.Body>
        <img
          src={item.is_male ? I.king : I.queen}
          alt="king crown"
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            width: 30,
            height: 30,
          }}
        />
        <Card.Title style={{ fontFamily: "Roboto-Bold", fontSize: 18 }}>
          {item && item.name}
        </Card.Title>
        <Card.Text style={{ fontFamily: "Roboto-Regular" }}>
          {item.year}
        </Card.Text>
        <ButtonGroup style={{ display: "flex", right: 0 }}>
          <Button
            variant="primary"
            onClick={() => {
              onImageOpen(item);
            }}
            style={{ alignItems: "center" }}
          >
            <Images /> {item.images.length}
          </Button>
          <Button
            variant="outline-warning"
            onClick={() => {
              onEdit(item);
              // setDeleteShow(true);
              // Ondelete(item);
            }}
          >
            <Pencil size={18} />
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              setDeleteShow(true);
              // Ondelete(item);
            }}
          >
            <Trash size={18} />
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
});

const Person = React.memo(({ item, count }) => {
  return (
    <div
      style={{
        marginBottom: 10,
        padding: 15,
        backgroundColor: "blue",
        color: "white",
        display: "flex",
        flexDirection: "row",
        borderRadius: 20,
      }}
    >
      <img
        src={item && axios.defaults.baseURL + item.profileimage}
        alt={item && item.name}
        className="result_profile"
      />
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
        <h5 style={{ fontFamily: "Roboto-Bold" }}>{item && item.name}</h5>
        <h6 style={{ fontFamily: "Roboto-Regular" }}>{item && item.year}</h6>
        <h6 style={{ fontFamily: "Roboto-Regular" }}>
          Vote : {item && item.count}
        </h6>
      </div>
    </div>
  );
});

const Selection = () => {
  const titleRef = useRef(0);
  const dateRef = useRef(0);
  const timeRef = useRef(0);

  const { votingcode, setVotingCode } = useContext(VotingCodeContext);

  const ConnectedDevice = useQuery(
    ["connect_device", votingcode],
    services.getDevice
  );

  const connectDeviceCount = useMemo(() => {
    if(ConnectedDevice.data){
      return ConnectedDevice.data && ConnectedDevice.data.data.length;
    }
  }, [ConnectedDevice.data]);

  useEffect(() => {
    if (!votingcode) {
      const f = async () => {
        let result = await localStorage.getItem("votingcode");

        if (result) {
          setVotingCode(result);
        }
      };

      f();
    }
  }, [votingcode]);

  const [radioValue, setRadioValue] = useState("All");

  const [Sel_Item, SetSel_Item] = useState();
  const [imgshow, setImgShow] = useState(false);

  const onImageOpen = (item) => {
    setImgShow(true);
    SetSel_Item(item);
  };

  const [whoS, setWhoS] = useState(0);
  const [akShow, setAkShow] = useState(false);

  const [ekShow, setEkShow] = useState(false);

  const nameRef = useRef(0);
  const yearRef = useRef(0);
  const fbRef = useRef(0);
  const igRef = useRef(0);
  const pfRef = useRef(0);

  const radios = [
    { name: "All", value: "All" },
    { name: "King", value: "king" },
    { name: "Queen", value: "queen" },
    { name: "Voting Result", value: "vr" },
  ];

  const all_data = useQuery(["voting_data", votingcode], services.getVoting);

  const KingResult = useQuery(
    ["kingresult", votingcode],
    services.getKingResult
  );
  const QueenResult = useQuery(
    ["queenresult", votingcode],
    services.getQueenResult
  );

  useEffect(() => {
    if (radioValue === "vr") {
      KingResult.refetch();
      QueenResult.refetch();
    }
  }, [radioValue]);

  const votingendtime = useMemo(() => {
    if (all_data.data) {
      return new Date(all_data.data.data.end_time);
    }
  }, [all_data.data]);

  const onImageHide = () => {
    all_data.refetch();
    setImgShow(false);
  };

  const createKing = useMutation(services.addKing, {
    onMutate: () => {},
    onSuccess: () => {
      all_data.refetch();
    },
  });

  const createQueen = useMutation(services.addQueen, {
    onMutate: () => {},
    onSuccess: () => {
      all_data.refetch();
    },
  });

  const deleteKing = useMutation(services.deleteKing, {
    onMutate: () => {},
    onSuccess: () => {
      all_data.refetch();
    },
  });

  const deleteQueen = useMutation(services.deleteQueen, {
    onMutate: () => {},
    onSuccess: () => {
      all_data.refetch();
    },
  });

  const DeletePeople = (item) => {
    // console.log("Deleteing Peopleing......");
    if (item.is_male) {
      deleteKing.mutate({
        id: item.id,
        votingcode: votingcode,
      });
    } else {
      deleteQueen.mutate({
        id: item.id,
        votingcode: votingcode,
      });
    }
  };

  const display_data = useMemo(() => {
    if (all_data.data) {
      const d = all_data.data.data;
      const sel_king = d.sel_king;
      const sel_queen = d.sel_queen;

      let all = sel_king.concat(sel_queen);
      if (radioValue === "All") {
        all = sel_king.concat(sel_queen);
      } else if (radioValue === "king") {
        all = sel_king;
      } else if (radioValue === "queen") {
        all = sel_queen;
      }

      return all;
    }
    return {};
  }, [all_data.data, radioValue]);

  const [stimeshow, setSTimeShow] = useState(false);

  const timechange = useMutation(services.setVotingEndTime, {
    onMutate: (e) => {},
    onSuccess: (e) => {
      all_data.refetch();
      alert("Time Successfully Updated");
    },
  });

  const display_king = useMemo(() => {
    if (all_data.data) {
      if (KingResult.data && all_data.data) {
        const d = KingResult.data.data;

        const d2 = all_data.data.data;
        const sel_king = d2.sel_king;

        const counts = {};

        for (const obj of d) {
          // Get the value to count
          const value = obj.selection;
          const f =
            sel_king &&
            sel_king.filter((i) => {
              console.log(i, value);
              return i.id === value;
            });

          // If the value is already a key in the counts object, increment the count
          if (counts[value]) {
            counts[value].count = counts[value].count + 1;
          }
          // Otherwise, add the value to the object with a count of 1
          else {
            counts[value] =
              f &&
              Object.assign({}, JSON.parse(JSON.stringify(f[0])), { count: 1 });
          }
        }

        const final = Object.values(counts);

        const result = final.sort((a, b) => b.count - a.count);

        return result;
      }
    }
  }, [KingResult.data, all_data.data]);

  const [editid, setEditid] = useState(0);
  const display_queen = useMemo(() => {
    if (all_data.data) {
      if (QueenResult.data && all_data.data) {
        const d = QueenResult.data.data;

        const d2 = all_data.data.data;
        const sel_queen = d2.sel_queen;

        const counts = {};

        for (const obj of d) {
          // Get the value to count
          const value = obj.selection;
          const f =
            sel_queen &&
            sel_queen.filter((i) => {
              console.log(i, value);
              return i.id === value;
            });

          // If the value is already a key in the counts object, increment the count
          if (counts[value]) {
            counts[value].count = counts[value].count + 1;
          }
          // Otherwise, add the value to the object with a count of 1
          else {
            counts[value] =
              f &&
              Object.assign({}, JSON.parse(JSON.stringify(f[0])), { count: 1 });
          }
        }

        const final = Object.values(counts);

        const result = final.sort((a, b) => b.count - a.count);

        return result;
      }
    }
  }, [QueenResult.data, all_data.data]);

  const editKing = useMutation(services.editKing, {
    onSuccess: () => {
      all_data.refetch();
    },
    onMutate: () => {},
  });

  const editQueen = useMutation(services.editqueen, {
    onSuccess: () => {
      all_data.refetch();
    },
    onMutate: () => {},
  });
  const onEdit = (data) => {
    if (data.is_male) {
      setWhoS("king");
      setEditid(data.id);
      nameRef.current = data.name;
      yearRef.current = data.year;
      igRef.current = data.iglink;
      fbRef.current = data.fblink;
      pfRef.current = data.profileimage;
      setEkShow(true);
    } else {
      setWhoS("queen");
      setEditid(data.id);
      nameRef.current = data.name;
      yearRef.current = data.year;
      igRef.current = data.iglink;
      fbRef.current = data.fblink;
      pfRef.current = data.profileimage;
      setEkShow(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      {stimeshow && (
        <Modal
          show={stimeshow}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Form.Group className="mb-3" controlId="register-control">
              <Form.Label>End Date & Time</Form.Label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="date"
                  className="mb-3"
                  placeholder="Date"
                  required
                  defaultValue={
                    new Date(votingendtime).toISOString().split("T")[0]
                  }
                  ref={dateRef}
                  // ref={r_name}
                />
                <Form.Control
                  type="time"
                  className="mb-3"
                  placeholder="Voting Title"
                  required
                  defaultValue={
                    new Date(votingendtime).toTimeString().split(" ")[0]
                  }
                  ref={timeRef}
                  // ref={r_name}
                />
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} onClick={(e) => setSTimeShow(false)}>
              Discard
            </Button>
            <Button
              variant={"primary"}
              onClick={() => {
                timechange.mutate({
                  votingcode: votingcode,
                  endtime: dateRef.current.value + " " + timeRef.current.value,
                });

                setSTimeShow(false);
              }}
              // onClick={CreateVoting}
              // onClick={(e) => setModalShow(false)}
            >
              Set Time
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {imgshow && (
        <ImageUpload show={imgshow} onHide={onImageHide} item={Sel_Item} />
      )}
      <Modal
        show={akShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <img
              src={whoS === "king" ? I.king : I.queen}
              alt="king crown"
              style={{
                width: 25,
                height: 25,
                marginRight: 5,
                marginTop: -2,
              }}
            />

            {whoS === "king" ? "Add King Selection" : "Add Queen Selection"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="register-control">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Name"
              required
              ref={nameRef}
              // ref={titleRef}
            />
            <Form.Label>Years and Semester</Form.Label>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Eg: 1CST"
              required
              // ref={dateRef}
              // ref={r_name}
              ref={yearRef}
            />
            <Form.Label>Facebook Profile Link</Form.Label>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="https://www.facebook.com/xxxxxxxxxxxx.xxxxx"
              required
              // ref={dateRef}
              // ref={r_name}
              ref={fbRef}
            />
            <Form.Label>Instagram Username</Form.Label>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="eg: thuralinhtut__"
              required
              // ref={dateRef}
              // ref={r_name}
              ref={igRef}
            />

            <Form.Label>Profile </Form.Label>

            <Form.Control
              type="file"
              className="mb-3"
              placeholder="Choose Image File"
              required
              // ref={dateRef}
              // ref={r_name}
              ref={pfRef}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"danger"} onClick={() => setAkShow(false)}>
            Discard
          </Button>
          <Button
            type="submit"
            variant={"primary"}
            onClick={(e) => {
              setAkShow(false);
              if (whoS === "king") {
                createKing.mutate({
                  name: nameRef.current.value,
                  year: yearRef.current.value,
                  fblink: fbRef.current.value,
                  iglink: igRef.current.value,
                  profileimage: pfRef.current.files[0],
                  votingcode: votingcode,
                });
              } else if (whoS === "queen") {
                createQueen.mutate({
                  name: nameRef.current.value,
                  year: yearRef.current.value,
                  fblink: fbRef.current.value,
                  iglink: igRef.current.value,
                  profileimage: pfRef.current.files[0],
                  votingcode: votingcode,
                });
              }
            }}
            // onClick={(e) => setModalShow(false)}
          >
            Add {whoS === "king" ? "King" : "Queen"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ekShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <img
              src={whoS === "king" ? I.king : I.queen}
              alt="king crown"
              style={{
                width: 25,
                height: 25,
                marginRight: 5,
                marginTop: -2,
              }}
            />

            {whoS === "king" ? "Edit King Selection" : "Edit Queen Selection"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="register-control">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Name"
              required
              defaultValue={nameRef.current}
              ref={nameRef}
              // ref={titleRef}
            />
            <Form.Label>Years and Semester</Form.Label>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Eg: 1CST"
              required
              defaultValue={yearRef.current}
              // ref={dateRef}
              // ref={r_name}
              ref={yearRef}
            />
            <Form.Label>Facebook Profile Link</Form.Label>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="https://www.facebook.com/xxxxxxxxxxxx.xxxxx"
              required
              defaultValue={fbRef.current}
              // ref={dateRef}
              // ref={r_name}
              ref={fbRef}
            />
            <Form.Label>Instagram Username</Form.Label>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="eg: thuralinhtut__"
              required
              defaultValue={igRef.current}
              // ref={dateRef}
              // ref={r_name}
              ref={igRef}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"danger"} onClick={() => setEkShow(false)}>
            Discard
          </Button>
          <Button
            type="submit"
            variant={"success"}
            onClick={(e) => {
              setAkShow(false);
              if (whoS === "king") {
                editKing.mutate({
                  id: editid,
                  name: nameRef.current.value,
                  year: yearRef.current.value,
                  fblink: fbRef.current.value,
                  iglink: igRef.current.value,
                  // profileimage: pfRef.current.files[0],
                  votingcode: votingcode,
                });
                setEkShow(false);
              } else if (whoS === "queen") {
                editQueen.mutate({
                  id: editid,
                  name: nameRef.current.value,
                  year: yearRef.current.value,
                  fblink: fbRef.current.value,
                  iglink: igRef.current.value,

                  votingcode: votingcode,
                });
                setEkShow(false);
              }
            }}
            // onClick={(e) => setModalShow(false)}
          >
            Edit {whoS === "king" ? "King" : "Queen"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Container style={{ marginTop: 10 }}>
        <h3>Create Selection</h3>
        <h5>{connectDeviceCount} Devices Connected</h5>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {all_data.data && (
            <CountdownTimer startDate={new Date()} endDate={votingendtime} />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={"outline-dark"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <div>
            <ButtonGroup>
              <Button
                variant="outline-dark"
                style={{ alignItems: "center" }}
                disabled={radioValue === "queen"}
                onClick={() => {
                  setWhoS("king");
                  setAkShow(true);
                }}
              >
                <img
                  src={I.king}
                  alt="king crown"
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 5,
                    marginTop: -2,
                  }}
                />
                Add King
              </Button>
              <Button
                variant="outline-dark"
                style={{ alignItems: "center" }}
                disabled={radioValue === "king"}
                onClick={() => {
                  setWhoS("queen");
                  setAkShow(true);
                }}
              >
                <img
                  src={I.queen}
                  alt="king crown"
                  style={{
                    width: 25,
                    height: 25,
                    marginRight: 5,
                    marginTop: -2,
                  }}
                />
                Add Queen
              </Button>
              <Button
                variant="outline-dark"
                style={{ alignItems: "center" }}
                // disabled={radioValue==='queen'}
                onClick={() => {
                  setSTimeShow(true);
                }}
              >
                <Clock size={25} /> Change End Time
              </Button>
            </ButtonGroup>
          </div>
        </div>
        {radioValue === "vr" ? (
          <Row style={{ marginTop: 50 }}>
            <Col>
              {all_data.data &&
                display_king &&
                display_king.map((item, index) => (
                  <Person item={item} key={index} />
                ))}
            </Col>
            <Col>
              {all_data.data &&
                display_queen &&
                display_queen.map((item, index) => (
                  <Person item={item} key={index} />
                ))}
            </Col>
          </Row>
        ) : (
          <>
            {all_data.isFetching ? (
              <img src={I.loading} style={{ width: 50, height: 50 }} />
            ) : (
              <div className={"profile_card"} style={{ marginTop: 50 }}>
                {/* {JSON.stringify(all_data.data)} */}

                {all_data.data &&
                  display_data.map((item, index) => (
                    <QRCard
                      item={item}
                      Ondelete={DeletePeople}
                      onImageOpen={onImageOpen}
                      key={index}
                      onEdit={onEdit}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Selection;
