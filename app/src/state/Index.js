import {combineReducers} from "redux";
import {appReducer} from "./AppReducer";
import {mapReducer} from "./MapReducer";

export default combineReducers({
    app: appReducer,
    map: mapReducer
})
