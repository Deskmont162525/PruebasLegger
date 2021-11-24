import {
	GET_ALL_LEADS 
} from "../../consts/actionConsts"

const initialState = {
	leads:[],	
};

export default function userReducer(state = initialState, action) {
	switch(action.type) {
		
		case GET_ALL_LEADS:
		return {
			...state,
			leads: action.payload
		}
		
		default:
			return { ...state };
	}
}