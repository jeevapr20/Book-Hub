import React from "react";

const ModalComponent = ({ show, book, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-dialog" style={{ backgroundColor: "white" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{book.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>
              <div
                className="modal-body"
                style={{
                  maxHeight: "auto",
                  overflowY: "auto",
                  wordWrap: "break-word",
                }}
              >
                <p>{book.description}</p>
              </div>
              <div
                className="modal-footer"
                style={{ backgroundColor: "black" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
