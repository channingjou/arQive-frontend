import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { updateAboutUs, getAboutUs } from "../../actions/management";
import { useEffect, useState } from "react";
import TinyMCE from "react-tinymce";
import Logo from "../images/aboutUs_03.png";
function Terms() {
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
    <div className={"main-content-div tos-row terms-of-service-full-page"}>
      <Row style={{ paddingTop: "80px"}}>
        <Col md={5} className={"offset-md-1"}>
          <h2 className="tosHeader contact-us-btn-div">Terms of Service</h2>
  
          <p className="tosBlock">
            All Content, whether publicly posted or privately transmitted, is the sole responsibility of 
            the person who originated such Content. The arqive and Cal State LA may not monitor or
            control the Content posted via the Services that The arqive provides and, we cannot take 
            responsibility for such Content. Any use or reliance on any Content or materials posted 
            via the Services or obtained by you through the Servies is at your own risk.
            <br />
            <br />
            The arqive and Cal State LA does not endorse, support, represent or guarantee the 
            completeness, truthfulness, accuracy, or reliability of any Content or communications 
            posted via the Services or endorse any opinions expressed via the Services. You 
            understand that by using the Services, you may be exposed to Content that might be 
            offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that 
            have been mislabeled or are otherwise deceptive. Under no circumstances will The 
            arqive and/or Cal State LA be liable in any way for any Content, including, but not limited 
            to, any errors or omissions in any Content, or any loss or damage of any kind incurred as 
            a result of the use of any Content posted, emailed, transmitted or otherwise made 
            available via the Services or broadcast elsewhere.
            <br />
            <br />
            You represent you have the legal right to post the content that you post on the Services.
            You may not post anything you have copied or collected from the internet that you do not 
            have the right to post.
            <br />
            <br />
            You retain your rights to any Content you submit, post or display on or through the 
            Services. By submitting, posting or displaying Content on or through the Services, you 
            grant The arqive a worldwide, non-exclusive, royalty-free license (with the right to 
            sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display 
            and distribute such Content in any and all media or distribution methods (now known or 
            later developed).  Furthermore, you grant all users of the Services a Creative Commons 
            License (CC BY-NC) for their use of the content you post. 
          </p>
        </Col>
      </Row>
    </div>
  );
}

  export default Terms;