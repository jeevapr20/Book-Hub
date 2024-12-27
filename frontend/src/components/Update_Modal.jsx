import React, { useState, useEffect } from "react";
import api from "../api";

function Update_Modal({ id, onClose, showModal, onUpdate }) {
  const [update, setUpdate] = useState({
    title: "",
    author: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
      console.log("id:", id);

      api
        .get(`/api/books/update/${id}/`)
        .then((res) => {
          const book = res.data;
          setUpdate({
            title: book.title,
            author: book.author,
            description: book.description,
            image: null,
          });
        })
        .catch((error) => alert(error));
    }
  }, [id]);

  const handleInputChange = (event, field) => {
    const { value, files } = event.target;
    setUpdate({
      ...update,
      [field]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", update.title);
    formData.append("author", update.author);
    formData.append("description", update.description);
    if (update.image) {
      formData.append("image", update.image);
    }

    api
      .put(`/api/books/update/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Book updated successfully!");
          onUpdate(res.data);
          onClose();
        } else {
          alert("Failed to update book");
        }
      })
      .catch((error) => alert("Error updating book"));
  };

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!showModal}
    >
      <div className="modal-dialog" style={{ backgroundColor: "white" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Book
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={update.title}
                    onChange={(e) => handleInputChange(e, "title")}
                  />
                </div>

                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    className="form-control"
                    value={update.author}
                    onChange={(e) => handleInputChange(e, "author")}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="8" cols="50"
                    className="form-control"
                    value={update.description}
                    onChange={(e) => handleInputChange(e, "description")}
                  />
                </div>

                <div className="form-group">
                  <label>Update Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => handleInputChange(e, "image")}
                  />
                </div>
                <div
                  className="d-flex justify-content-end"
                  style={{ width: "100%" }}
                >
                  <button
                    type="submit"
                    className="btn btn-warning"
                    style={{ marginRight: "10px", marginTop: "10px" }}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer" style={{ backgroundColor: "black" }}>
            <div
              className="d-flex justify-content-end"
              style={{ width: "100%" }}
            >
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update_Modal;
