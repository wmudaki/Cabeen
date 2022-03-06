import {combineReducers} from "redux";
import {appReducer} from "./AppReducer";
import {mapReducer} from "./MapReducer";
import {cabeenReducer} from "./CabeenReducer";
import {tourReducer} from "./TourReducer";


export default combineReducers({
    app: appReducer,
    map: mapReducer,
    cabeen: cabeenReducer,
    tour: tourReducer
})
