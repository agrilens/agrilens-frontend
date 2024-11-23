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
          <Modal.Title className="text-danger fs-3">
            {modalErrorMessage.errorTitle || "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-primary fs-2">
          <i className="fa-sharp fa-solid fa-circle-info me-2" />
          {modalErrorMessage.errorMessage || "Something wrong happened."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-primary px-4"
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
