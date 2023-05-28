import axios from "axios";
import {BASE_URL} from "./api";

export const auth = {
    signup: (data) => {
        console.log(data)
        axios.post(`${BASE_URL}/signup`, data)
    }
}