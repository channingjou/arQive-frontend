import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import InputGroup from "react-bootstrap/InputGroup";
import "react-datepicker/dist/react-datepicker.css";
import TinyMCE from "react-tinymce";
import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from 'react'

// import
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { colors } from "@material-ui/core";

// setup
const provider = new OpenStreetMapProvider();

//This boolean is used to check whether the inside of the return statement for
//ModalAddPinForm is allowed to run. Boolean is allowed to changed depending on conditions.
//WARNING: You cannot add any stories at all if okToPost is set to false initially
const okToPost = {
  ok: true,
}

const _okToPostAgain = () => {
  okToPost.ok = true;
}

const labelStyle = {
  marginRight: "10px",
};

const dateStyle = {
  marginRight: "10px",
  marginTop: "auto",
  marginBottom: "auto",
};

function ModalAddPinForm(props) {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const validateAddPinForm = async (e) => {
    e.preventDefault();
    let results = "";

    if (props.addAddress) {
      let address = props.addPinValues.address;
      let locality = props.addPinValues.locality;
      let region = props.addPinValues.region;
      let country = props.addPinValues.country;
      let postCode = props.addPinValues.postCode;
      let addressQuery =
        address +
        " " +
        locality +
        " " +
        region +
        " " +
        postCode +
        " " +
        country;
      // search
      results = await provider.search({ query: addressQuery });
    }

    if (props.addPinValues.title && props.addPinValues.description) {
      if (results.length > 0) {
        props.addPinValues.latitude = Number(results[0].y);
        props.addPinValues.longitude = Number(results[0].x);
      }

      //props.handleAddPinSubmit() runs after the save button is pressed.
      props.handleAddPinSubmit();

      //Does not allow application to add additional stories after successful post
      okToPost.ok = false;

      //setTimeOut function uses "private" method to set okToPost.ok to true,
      //but only after a certain amount of time has passed. This forces users
      //to wait a certain amount of time before posting again. 1 second = 1000
      setTimeout(_okToPostAgain, 15000);
    }
  };

  if(okToPost.ok === false) {
    return (
      <>
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <p>Please wait a few seconds before posting again</p>
      </Modal>
      </>
    )
  };

  return (
    <>
    {props.isAuthenticated && okToPost.ok === true && (
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> Add a story </ModalHeader>
        <Form onSubmit={validateAddPinForm}>
          <ModalBody>
            {props.addAddress ? (
              <>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="address"
                    value={props.addPinValues.address}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        address: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Locality (City, township, etc.)</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="locality"
                    value={props.addPinValues.locality}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        locality: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Region (State, province, etc.)</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="region"
                    value={props.addPinValues.region}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        region: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Country</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="country"
                    value={props.addPinValues.country}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        country: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  
                  <Label for="address">Postcode</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="postcode"
                    value={props.addPinValues.postCode}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        postCode: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </>
            ) : (
              ""
            )}
            <FormGroup>
              <Label for="title">Title</Label>
              {!props.addPinValues.title ? (
                <p className="story-form-alerts">*Please enter a story title</p>
              ) : null}
              <Input
                className="form-control"
                type="text"
                name="title"
                value={props.addPinValues.title}
                onChange={(e) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    title: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select
                name="category"
                value={props.addPinValues.category}
                onChange={(e) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    category: e.target.value,
                  })
                }
              >
                <option value="1">Personal</option>
                <option value="2">Resources</option>
                <option value="3">Historical</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              {!props.addPinValues.description ? (
                <p className="story-form-alerts">
                  *Please enter a story description
                </p>
              ) : null}
              <TinyMCE
                content={props.addPinValues.description}
                config={{
                  height: 300,
                  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                  plugins: "autolink link image lists print preview emoticons",
                  toolbar: "undo redo | bold italic emoticons",
                }}
                onChange={(e) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    description: e.target.getContent(),
                  })
                }
              />
            </FormGroup>
            {!props.addAddress ? (
              <FormGroup>
                <Label style={labelStyle} for="radius">
                  Anonymity radius
                </Label>
                <select
                  name="anonradius"
                  value={props.addPinValues.userRadius}
                  onChange={(e) =>
                    props.setaddPinValues({
                      ...props.addPinValues,
                      anonradius: e.target.value,
                    })
                  }
                  // onChange={e => props.setAnonRadius(e.target.value)}
                >
                  <option value="1">None</option>
                  <option value="2">Minimum</option>
                  <option value="3">Moderate</option>
                  <option value="4">Maximum</option>
                </select>
              </FormGroup>
            ) : (
              ""
            )}
            <InputGroup>
              <Label style={dateStyle} for="startDate">
                Start Date
              </Label>
              <DatePicker
                format={"MM/dd/yyyy"}
                name="startDate"
                minDate={new Date("0100-01-01")}
                maxDate={props.addPinValues.endDate}
                value={props.addPinValues.startDate}
                onChange={(date) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    startDate: date,
                  })
                }
              />
              <Label style={dateStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </Label>
              <DatePicker
                format={"MM/dd/yyyy"}
                minDate={props.addPinValues.startDate}
                name="endDate"
                value={props.addPinValues.endDate}
                onChange={(date) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    endDate: date,
                  })
                }
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              className="default-btn-purple"
              style={{ marginRight: "20px" }}
              onClick={props.toggle}
            >
              Cancel
            </Button>
            <Button className="default-btn-purple">
                Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    )}
    </>
  )
}

export default ModalAddPinForm;