import {
  GET_PINS,
  DELETE_PINS,
  ADD_PIN,
  EDIT_PIN,
  GET_PIN
} from "../actions/types.js";

const initialState = {
  pins: [],
  pin: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PIN:
      return {
        ...state,
        pin: action.payload
      };
    case GET_PINS:
      return {
        ...state,
        pins: action.payload
      };
    case DELETE_PINS:
      return {
        ...state,
        pins: state.pins.filter(pins => pins.id !== action.payload)
      };
    case ADD_PIN:
      return {
        ...state,
        pins: [...state.pins, action.payload]
      };
    case EDIT_PIN:
      return {
        ...state,
        pins: [...state.pins, action.payload]
      };

    default:
      return state;
  }
}