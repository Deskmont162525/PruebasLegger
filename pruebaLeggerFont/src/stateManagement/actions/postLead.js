import axios from "axios";
import {POST_LEAD_SEND_URL, GET_ALL_LEADS_URL} from '../../constants';
import { GET_ALL_LEADS } from "../../consts/actionConsts";
const querystring = require('querystring');

export const postCrearLead = (data) => async (dispatch) => {
  try {
    const allLeadsen = await axios.post(POST_LEAD_SEND_URL, querystring.stringify(data));
    const allLeads = await axios.get(GET_ALL_LEADS_URL);
    return dispatch({ type: GET_ALL_LEADS, payload: allLeads.data });
  } catch (err) {
    console.error(err);
  }
};
