import axios from 'axios'
import { axiosInstance, SERVER_API } from './config';

import Toastify from 'toastify-js';


const authServices = {};


//loginCreds must be {username: "admin", password: "ABC123DEF"}
authServices.signIn = async (loginCreds) => {
  try {
    const { data } = await axios.post(`${SERVER_API}login`, { ...loginCreds });
    Toastify({
      text: data?.message,
      style: {
        background: '#7352C7',
      },
    }).showToast();
    return data;
  } catch (err) {
    Toastify({
      text:  err?.response?.data?.message,
      style: {
        background: '#EB3145',
      },
    }).showToast();
  }
};


//signup
authServices.signUp = async (signupCreds) => {
  try {
    const { data } = await axiosInstance.post('signup', { ...signupCreds });
    Toastify({
      text: data?.message,
      style: {
        background: '#7352C7',
      },
    }).showToast();
    return data;
  } catch (err) {
    Toastify({
      text: err?.response?.data?.message,
      style: {
        background: '#EB3145',
      },
    }).showToast();
  }
};

export default authServices;