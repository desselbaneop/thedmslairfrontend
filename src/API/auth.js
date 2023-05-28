import axios from "axios";
import {BASE_URL} from "./api";

export const auth = {
    signup: async (data) => await axios.post(`${BASE_URL}/signup`, data)

}