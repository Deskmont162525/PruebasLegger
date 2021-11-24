import axios from "axios";
import {GET_ALL_LEADS_URL} from '../../constants';
import { GET_ALL_LEADS } from "../../consts/actionConsts";

export const getAllLeads = () => async (dispatch) => {
  try {
    const allLeads = await axios.get(GET_ALL_LEADS_URL);
    return dispatch({ type: GET_ALL_LEADS, payload: allLeads.data });
  } catch (err) {
    console.error(err);
  }
};
