import React, { useRef, useState, useContext, useMemo } from "react";

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
    Wallet,
    Trash,
    Images,
    Pencil,
    XCircle,
} from "react-bootstrap-icons";
import axios from "axios";

const ImageUpload = ({ onHide, show, item }) => {
    const data = useQuery(
        ["image", item.id],
        item.is_male ? services.getKingImage : services.getQueenImage
    );

    const [files, setFiles] = useState([]);
    const fileinput = useRef(null);

    const [previews, setPreviews] = useState([]);

    const [is_uploading, setIsUploading] = useState(false);

    const [imagecount, setImageCount] = useState(0);

    const handleUpload = async () => {
        // files.map((item,index)=>{
        //     console.log(item);
        // });

        setIsUploading(true);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // console.log(file )
            const result = await (item.is_male
                ? services.addKingImage({ person_id: item.id, image: file })
                : services.addQueenImage({ person_id: item.id, image: file }));
            if (result.status === 201) {
                setImageCount((b) => b + 1);
            }
            // console.log('Image Upload reslut',result)
        }

        setIsUploading(false);

        onHide();
        setFiles(null);
    };

    const handleChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(selectedFiles);

        // Preview the selected images
        const previewUrls = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                previewUrls.push(reader.result);
                setPreviews(previewUrls);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>Images</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="file"
                    multiple
                    ref={fileinput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    accept={"image/*"}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        variant="primary"
                        onClick={() => fileinput.current.click()}
                    >
                        <Images size={25} /> Choose Images
                    </Button>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {data.isFetching ||
                            (is_uploading && (
                                <img
                                    src={I.loading}
                                    alt={"load"}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        tintColor: "#000000",
                                    }}
                                />
                            ))}
                        {is_uploading && (
                            <h6>
                                Uploading {imagecount}/{files.length}
                            </h6>
                        )}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                    }}
                >
                    <div className="profile_card" style={{ marginTop: 20 }}>
                        {previews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt="Preview"
                                className="previmage"
                            />
                        ))}

                        {data.data &&
                            data.data.data.map((item, index) => (
                                <img
                                    key={index}
                                    src={axios.defaults.baseURL + item.image}
                                    alt="uploadimage"
                                    className="uploadimage"
                                />
                            ))}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"primary"}
                    disabled={files.length <= 0}
                    onClick={() => handleUpload()}
                >
                    <CloudArrowUp size={25} /> Upload {files.length} Images
                </Button>
                <Button variant={"danger"} disabled={is_uploading} onClick={() => onHide()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImageUpload;
