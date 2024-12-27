import React from "react";

function Book({ book, onDelete, onUpdate, openModal }) {
  return (
    <>
      <div className="cards">
        {book.image && (
          <div className="card" style={{ width: "100%" }}>
            <img
              src={book.image}
              className="card-img-top"
              alt={book.title}
              style={{ width: "100%", height: "auto", aspectRatio: "1" }}
            />
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-texts">{book.author}</p>

          <div style={{ display: "flex", justifyContent: "end" }}>
            &nbsp;&nbsp;
            <button
              className="btn btn-outline-warning"
              onClick={() => onUpdate(book.id)}
            >
              Update
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                onDelete(book.id);
              }}
            >
              Delete
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => openModal(book)}
            >
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book;
