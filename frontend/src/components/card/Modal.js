import React from 'react';
import { Flex } from "@chakra-ui/react";
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, children, title }) => {
    return (
        <div
            className="modal"
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "9999",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="modal-content"
                style={{
                    position: "relative",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    maxWidth: "90%",
                    maxHeight: "90%",
                    overflow: "auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        backgroundColor: "#f2f2f2",
                    }}
                >
                    <h2>{title}</h2>
                    <button onClick={onClose}>
                        <AiOutlineClose />
                    </button>
                </div>

                <Flex direction="column" w="400px" h="500px">
                    <p>Are you sure you want to sell this ting?</p>
                    {children}
                </Flex>
            </div>
        </div>
    );
};


export default Modal;
