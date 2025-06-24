import {
  ACTIVATE_USER,
  SET_USER,
  SET_USER_TOKEN,
  SET_USER_ORDER,
  SET_LOADING_STATUS,
  GET_BOOKS,
  SET_CATEGORIES,
  SET_CREATE_DONATION_STATUS,
  SET_LOADING_MESSAGE,
  SET_ERRORS,
} from "./actionType";
import { BASE_URL } from "../utils/constants";
import * as messages from "../utils/messages";

export const setUserActivationStatus = (payload) => ({
  type: ACTIVATE_USER,
  activate: payload,
});

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setUserToken = (payload) => ({
  type: SET_USER_TOKEN,
  token: payload,
});

export const setUserOrder = (payload) => ({
  type: SET_USER_ORDER,
  order: payload,
});

export const setCategories = (payload) => ({
  type: SET_CATEGORIES,
  apiCategories: payload,
});

export const setCreateDonationStatus = (payload) => ({
  type: SET_CREATE_DONATION_STATUS,
  createDonationStatus: payload,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
});

export const setLoadingMessage = (message) => ({
  type: SET_LOADING_MESSAGE,
  loading_message: message,
});

export const getBooks = (payload) => ({
  type: GET_BOOKS,
  payload: payload,
});

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  errors: errors,
});


export function signUpAPI(data) {
  return (dispatch) => {
    dispatch(setLoading(true));
    const url = `${BASE_URL}/users/signup/`;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json", //vnd.api+
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(setUserActivationStatus(true));
          dispatch(setLoadingMessage(messages.SIGNUP_SUCCESS_MESSAGE));
        } else if (data.failed) {
          //console.log(data.errors);
          dispatch(setErrors(data.errors));
          dispatch(setLoading(false));
        }
      })
      .catch((errorMessage) => {
        //console.log(errorMessage);
        dispatch(setLoadingMessage(messages.SIGNUP_FAILED_MESSAGE));
      });
  };
}

export const getUserTokenAPI = (payload) => (dispatch) => {
  const url = `${BASE_URL}/users/token/`;

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .then((data) => {
      dispatch(setUserToken(data));
    })
    .catch((error) => {
      alert(error.message);
    });
};

export function loginAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setErrors(null));

    const url = `${BASE_URL}/users/login/`;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(setUser(data.user_data));
          dispatch(
            getUserTokenAPI({
              email: data.user_data.email,
              password: payload.password,
            })
          );
        } else if (data.failed) {
          //console.log(data.errors);
          dispatch(setErrors({ login: data.errors }));
          dispatch(setLoading(false));
        }
      })
      .catch((errorMessage) => {
        //console.log(errorMessage);
      });
  };
}
// if(!response.ok) throw new Error(response.status);
// else return response.json();
export function logOutAPI() {
  return (dispatch) => {
    dispatch(setUser(null));
  };
}


export function createDonationAPI({ payload, files }) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(setErrors(null));
    const url = `${BASE_URL}/books/`;
    const state = getState();
    const authToken = state.userState.token.access;

    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    formData.append("flyer", files.flyer);
    formData.append("images_length", files.images.length);
    for (var i = 0; i < files.images.length; i++) {
      formData.append(`image-${i}`, files.images[i].file);
    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(setCreateDonationStatus(true));
        } else if (data.failed) {
          //console.log(data.errors);
          dispatch(setCreateDonationStatus(false));
          let msg = (
            <>
              <img src="/images/icons/error.svg" />
              <p style={{ color: "red" }}>
                Failed to create event. {data.errors.name}{" "}
              </p>
            </>
          );
          dispatch(setLoadingMessage(msg));
        }
      })
      .catch((errorMessage) => {
        //console.log(errorMessage);
      });
  };
}

export function getCategoriesAPI() {
  return (dispatch) => {
    const url = `${BASE_URL}/events/categories/`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((categories) => {
        dispatch(setCategories(categories));
        //console.log("Categories ", categories);
      })
      .catch((errorMessage) => {
        //console.log(errorMessage);
      });
  };
}


// ----------------------------
// ------ BOOK REQUEST --------

export function requestAPI(data) {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const url = `${BASE_URL}/order/`;

    const state = getState();
    const authToken = state.userState.token.access;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json", 
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.failed) {
          //console.log(data.errors);
          dispatch(setErrors(data.errors));
          dispatch(setLoading(false));
        }
        else {
          //console.log(data);
          dispatch(setUserOrder(data));
          dispatch(setLoading(false));
        }  
      })
      .catch((errorMessage) => {
        //console.log(errorMessage);
        dispatch(setLoadingMessage(""));
      });
  };
}