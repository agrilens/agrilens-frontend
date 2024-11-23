import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  useEvaluationContext,
  useEvaluationUpdateContext,
} from "../contexts/EvaluationContext";

const ActionErrorPopup = ({ errorTitle, errorMessage }) => {
  const { showErrorModal, modalErrorMessage } = useEvaluationContext();
  const { handleCloseErrorModal, handleShowErrorModal } =
    useEvaluationUpdateContext();

  return (
    <>
      <Modal size="lg" show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            {modalErrorMessage.errorTitle || "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-warning">
          {modalErrorMessage.errorMessage || "Something wrong happened."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="bg-danger"
            onClick={handleCloseErrorModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ActionErrorPopup;
