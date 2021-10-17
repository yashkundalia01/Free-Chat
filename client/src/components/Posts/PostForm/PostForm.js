import React, { useState, useEffect } from "react";
import Post from "./../Post/Post";
import "./PostForm.css";
import { loadUser } from "../../../store/actions/index";
import storage from "../../../firebase/index";
import { Link, Redirect } from "react-router-dom";

export default function PostForm(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [photo, setPhoto] = useState([]);
  const [desc, setDesc] = useState("");
  const cuser = localStorage.getItem("name");

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  function HandlePost(e) {
    e.preventDefault();
    const name = photo.name + new Date();
    console.log(name);
    const uploadTask = storage.ref(`postimages/${name}`).put(photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("postimages")
          .child(name)
          .getDownloadURL()
          .then((url) => {
            const postdata = {
              postuser: cuser,
              imagepost: url,
              descriptions: desc,
              postdate: new Date(),
            };
            fetch("http://localhost:5000/api/posts/", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(postdata),
            }).then((res) => res.json());
          });
      }
    );
    closeForm();
    setDesc("");
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    setImage({ preview: "", raw: "" });
  }

  function handleChange(e) {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setPhoto(e.target.files[0]);
    }
  }

  function handleChangetext(e) {
    setDesc(e.target.value);
  }

  if (!localStorage.token) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        {}
        <Post />
        <button className="open-button" onClick={openForm}>
          NEW POST
        </button>
        <div className="form-popup" id="myForm">
          <div className="form-container">
            <h2>NEW POST</h2>
            {!image.preview ? (
              <>
                <label htmlFor="email">
                  <b>UPLOAD IMAGE</b>
                </label>
                <input
                  type="file"
                  id="image-file"
                  onChange={handleChange}
                  required
                />
              </>
            ) : (
              <div className="text-center">
                <img
                  src={image.preview}
                  className="rounded"
                  style={{ width: "20vh", height: "15vh" }}
                  alt="imagepreview"
                />
              </div>
            )}
            <label htmlFor="psw">
              <b>Description</b>
            </label>
            <input
              type="text"
              placeholder="Enter Description"
              value={desc}
              onChange={handleChangetext}
              required
            />

            <button type="button" className="btn" onClick={HandlePost}>
              POST
            </button>
            <button type="button" className="btn cancel" onClick={closeForm}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
