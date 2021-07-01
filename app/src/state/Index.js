import {combineReducers} from "redux";
import {appReducer} from "./AppReducer";
import {mapReducer} from "./MapReducer";
import {cabeenReducer} from "./CabeenReducer";

export default combineReducers({
    app: appReducer,
    map: mapReducer,
    cabeen: cabeenReducer
})
