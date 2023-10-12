import React, { useState } from 'react';
import Modal from './Modal';

const ActionButton = ({ title, icon, children }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button onClick={handleClick}
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none",
                }}
            >
                <div
                    // big circle
                    style={{
                        backgroundColor: 'orange',
                        width: "60px",
                        height: "60px",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    {icon}
                </div>

                {title}
            </button>
            {showModal && <Modal onClose={handleCloseModal} children={children} title={title} />}
        </>
    );
};

export default ActionButton;
