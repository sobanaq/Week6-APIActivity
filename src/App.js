import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [title, setTitle] = useState({});
  const [book, setBook] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorMsg("");
        const response = await fetch(
          "https://legacy--api.herokuapp.com/api/v1/books"
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        setErrorMsg("Oops something went wrong...");
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClick = (character) => {
    setTitle(character);
    setShowModal(true);
  };

  if (errorMsg !== "") {
    return <h1>{errorMsg}</h1>;
  }

  return (
    <div className="pageWrapper">
      <img src={logo} alt="Harry Potter logo" />
      <br></br>
      <code>
        API endpoint: "https://legacy--api.herokuapp.com/api/v1/books"
      </code>

      {/* map through data from API that is stored in the state */}

      <div className="imageWrapper">
        {book.map((HPChars, index) => {
          return (
            <div>
              <p key={index}>{book.id}</p>
              <p key={index}>{book.name}</p>
              <img
                src={HPChars.image_url}
                alt="Harry Potter Characters"
                onClick={() => handleClick(book)}
              ></img>
              <br></br>
              <button>More info</button>
            </div>
          );
        })}
      </div>

      {console.log(title)}
      {showModal && <Modal closeModal={setShowModal} char={title} />}
    </div>
  );
};

export default App;
