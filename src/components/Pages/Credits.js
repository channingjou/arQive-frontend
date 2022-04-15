import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { updateAboutUs, getAboutUs } from "../../actions/management";
import { useEffect, useState } from "react";
import TinyMCE from "react-tinymce";

function Credits() {
  const [editButtonValue, setEditButtonValue] = useState("Edit");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const { user } = auth;
  const [editorContent, setEditorContent] = useState("");

  let authorized = false;

  if (user) {
    if (user.is_administrator || user.is_moderator) {
      authorized = true;
    }
  }

  useEffect(() => {
    dispatch(getAboutUs());
  }, [dispatch]);

  const handleEditorChange = (e) => {
    setEditorContent(e.target.getContent());
  };

  const submitEdit = () => {
    const about_us = editorContent;
    const aboutUsData = { about_us };
    dispatch(updateAboutUs(aboutUsData));
  };

  const editAboutUs = () => {
    if (editMode) {
      setEditButtonValue("Edit");
      setEditMode(false);
    } else {
      setEditButtonValue("Close");
      setEditMode(true);
    }
    // show edit form
  };

  const canEdit = (
    <div className="admin-moderator-edit">
      <button
        onClick={editAboutUs}
        className="btn btn-success admin-moderator-edit"
      >
        {editButtonValue}
      </button>
    </div>
  );

  const showEditor = (aboutUsContent) => (
    <div>
      <TinyMCE
        content={aboutUsContent}
        config={{
          height: 300,
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          plugins: "autolink link image lists print preview",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright",
        }}
        onChange={handleEditorChange}
      />
      <button
        onClick={submitEdit}
        className="btn btn-success admin-moderator-edit"
      >
        Submit
      </button>
    </div>
  );

  return (
    <div className={"main-content-div credits-page"}>
      <Row style={{ paddingTop: "35px" }}>
        <Col md={6} className={"offset-md-3"}>
          <h2 className="resource-title" style={{ paddingLeft: "140px" }}>The archive of the arQive</h2>
          <div className="col-md-12 m-auto">
            <div className="card card-body resources-card">
              <h2 className="resource-title" style={{ paddingLeft: "190px" }}>2019 Team</h2>
              <p className="resource-contact-text">Developers:</p>
              <p className="resource-text">
                Fadi Haddad, Klaudia Hernandez, Nathaniel Suarez, Tony Truong, Justine West
              </p>
              <div>
                <span className="resource-contact-text">Art Director: </span> 
                <span className="resource-text">Liz Sweeny</span>
              </div>
              <div>
                <span className="resource-contact-text">Art Designers: </span> 
                <span className="resource-text">Angie Strong, Laura Torres</span>
              </div>
              <p className="resource-contact-text">Public Relations Team:</p>
              <p className="resource-text">
                Andrea Estrada, Aliyah Johnson, Laytyn MacKinnon, Nicholas Ochoa, Pamela Sanchez, 
                Maryah Rendon, Members of Zenith Experiential, Los Angeles (ZENX-LA)
              </p>
            </div>
          </div>
          <div className="col-md-12 m-auto">
            <div className="card card-body resources-card">
              <h2 className="resource-title" style={{ paddingLeft: "190px" }}>2020 Team</h2>
              <p className="resource-contact-text">Developers:</p>
              <p className="resource-text">
                Randy Arruda, Balarama Carter, Richard Cruz-Silva, Abram Flores, Carlos Larios-Solis,
                Khang Le, Brandon Lee, Casandra Pahed, Evelyn Ramirez
              </p>
            </div>
          </div>
          <div className="col-md-12 m-auto">
            <div className="card card-body resources-card">
              <h2 className="resource-title" style={{ paddingLeft: "190px" }}>2021 Team</h2>
              <p className="resource-contact-text">Developers:</p>
              <p className="resource-text">
                Erica Santos, Leslie Segovia, Bryan Sosa, Daniel Lee, Erica Payne, Elio Vences,
                Matthew Frias, Jesus Gonzalez, Kevin Kazaryan, Stewart McKenzie.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Credits;