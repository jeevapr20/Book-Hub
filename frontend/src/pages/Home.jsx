import { useState, useEffect } from "react";
import api from "../api";
import Book from "../components/Book";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import Update_Modal from "../components/Update_Modal";
import ModalComponent from "../components/Modal";

function Home() {
  const [books, setBooks] = useState([]);
  const [bookIdToUpdate, setBookIdToUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showItem, setShow] = useState(false);
  const [bookItem, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3); 

  const openModal = (book) => {
    setItem(book);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    api
      .get("/api/books/")
      .then((res) => res.data)
      .then((data) => {
        setBooks(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteBooks = (id) => {
    api
      .delete(`/api/books/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Book deleted");
        else alert("Failed to delete book.");
        getBooks();
      })
      .catch((error) => alert(error));
  };

  const handleUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleUpdateClick = (id) => {
    setBookIdToUpdate(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createBooks = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    api
      .post("/api/books/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Book created");
          getBooks();
        } else {
          alert("Failed to create book");
        }
      })
      .catch((err) => alert(`Error: ${err}`));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredBooks.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredBooks.length / recordsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "6rem",
            color: "aqua",
          }}
        >
          Book Hub
        </h1>

        <div
          className="d-flex align-items-center"
          style={{ marginLeft: "15px", marginBottom: "50px" }}
        >
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger"
            style={{ cursor: "pointer", color: "red" }}
          >
            Logout
          </button>
          &nbsp;&nbsp;
          <button
            onClick={toggleCreateForm}
            className="btn btn-outline-primary"
            style={{ width: "200px" }}
          >
            {showCreateForm ? "Cancel" : "Create Book"}
          </button>
          <div
            className="container-fluid ms-auto"
            style={{ display: "flex", justifyContent: "end", marginRight:"0" }}
          >
            <form className="d-flex" role="search">
              <input
                id="field"
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="Enter Book Title"
                aria-label="Search"
                style={{ width: "300px", padding: "0px", backgroundColor:"black" }}
                value={searchTerm}
                onChange={handleSearch}
              />
            </form>
          </div>
        </div>

        {showCreateForm && (
          <div
            className="container shadow mt-1"
            style={{ width: "50%", marginBottom: 50 }}
          >
            <div className="card" style={{ backgroundColor: "black" }}>
              <div className="card-header text-white">
                <h2 style={{ display: "flex", justifyContent: "center" }}>
                  Create Book
                </h2>
              </div>
              <div className="card-body">
                <form onSubmit={createBooks}>
                  <div className="form-group p-3">
                    <label>Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group p-3">
                    <label>Author</label>
                    <input
                      id="content"
                      name="content"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group p-3">
                    <label>Description</label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      rows="4"
                    />
                  </div>
                  <div className="form-group p-3">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={toggleCreateForm}
                      className="btn btn-outline-primary mt-3"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {showCreateForm ? "Cancel" : "Cancel"}
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-outline-primary mt-3"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      Create Book
                    </button>
                    &nbsp;
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="book-display row">
          {currentRecords.map((book) => (
            <div key={book.id} className="col-12 col-sm-6 col-md-3 mb-4">
              <div
                className="card book-card"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  marginTop: "10px",
                  marginLeft: "40px",
                  marginRight: "40px",
                }}
              >
                <Book
                  book={book}
                  onDelete={deleteBooks}
                  onUpdate={handleUpdateClick}
                  openModal={openModal}
                />
              </div>
            </div>
          ))}
        </div>

        <ModalComponent show={showItem} book={bookItem} onClose={closeModal} />

        <div className="pagination" style={{display:"flex", justifyContent:"center", marginTop:"20px", marginBottom:"50px"}}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => changePage(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {showModal && (
        <Update_Modal
          id={bookIdToUpdate}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          showModal={showModal}
        />
      )}
    </>
  );
}

export default Home;
