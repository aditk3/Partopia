import axios from "axios";
import { checkStateFields } from "../utils/Utilities";

export async function loginService(event, state) {
    event.preventDefault();
    if (checkStateFields(state)) {
      const res = await axios.post(`${process.env.REACT_APP_AUTH_URL}/login`, { ...state })
      if(res.status === 200) {
            let token = res.headers.token;
            sessionStorage.setItem("token", token);
            return true;
      }
    }
  };


export async function registerService(event, state) {
    event.preventDefault(); 
    if (checkStateFields(state)) {
        const res = await axios.post(`${process.env.REACT_APP_AUTH_URL}`, { ...state })
        if(res.status === 201) return true;
      }
}

export function logoutService() {
  sessionStorage.clear("token");
}



