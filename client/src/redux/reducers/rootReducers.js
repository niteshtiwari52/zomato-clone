import { combineReducers } from "redux";

// reducers or storage units
import auth from "../auth/auth.reducer";
import user from "../User/user.reducer"

const rootReducer = combineReducers({
  auth,
  user
});

export default rootReducer;
