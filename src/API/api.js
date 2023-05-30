import {auth} from "./auth";
import {user} from "./user";
import {character} from "./character";
import {campaign} from "./campaign";

export const BASE_URL = 'http://127.0.0.1:8080/api'

export const api = {
    auth: auth,
    user: user,
    character: character,
    campaign: campaign,
}