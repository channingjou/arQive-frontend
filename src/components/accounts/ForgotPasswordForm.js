import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { LINK } from "../../link/link";
import {
  Input,
} from "reactstrap";
import useRemovalConfirm from "../profile/CustomHooks/useRemovalConfirm";
import ConfirmationModal from "../profile/ConfirmationModal";
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(true);
  const [messageFromServer, setMessageFromServer] = useState("");
  const { loginregisterModalState, loginToggle } = useRemovalConfirm();
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (!showError)
      axios
        .post(`${LINK}/password_reset/`, {
          email: email,
        })
        .then((response) => {
          setMessage("email has been sent!");
          loginToggle();
          setEmail("");
        })
        .catch((error) => {
          setMessage("please enter a valid email");
          loginToggle();
          setEmail("");
        });
    else {
      setMessage("please enter a valid email");
      loginToggle();
      setEmail("");
    }
  };
  const validateEmail = () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      email.length > 0
    ) {
      setShowError(false);
    }
  };
  return (
    <div className={"main-content-div forgot-password-div"}>
      <div className="col-md-6 m-auto forgot-password-col">
        <div className="card card-body mt-5 forgot-password-card accounts-form-group">
          <h2 className="text-center forgot-password-title">Forgot Password</h2>
          <form className="profile-form" onSubmit={sendEmail}>
            <div className="form-group" style={{ marginTop: "20px" }}>
              <p className="forgot-password-text">Please input your e-mail:</p>
              <Input
                id="email"
                label="E-mail"
                value={email}
                onBlur={validateEmail}
                onChange={(e) => setEmail(e.target.value)} // not sure about this part
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary float-right default-btn-purple"
            >
              Forgot Password
            </button>
          </form>
          {/* {showNullError && (
          <div>
            <p className="text-danger">*You must input a email address </p>
          </div>
        )}
        {showError && (
          <div>
            <p className="text-danger">
              *That email address doesn't exist, please try again or register
              for a new account
            </p>
          </div>
        )}
        {messageFromServer === "recovery email sent" && (
          <div>
            <h3>Password Reset Email Sent Successfully!</h3>
          </div>
        )} */}
        </div>
      </div>
      <ConfirmationModal
        modalState={loginregisterModalState}
        toggle={loginToggle}
        title={message}
        buttonTitle={"dismiss"}
        onSubmit={loginToggle}
      />
    </div>
  );
}
