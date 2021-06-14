
const INITIAL_STATE = {
	searchTerm: '',
	searchResults: {},
	autocomplete: false,
	place: '',
	userLocation: {},
	searchLocation: {},
	moveCamera: false,
	overlay: true
}

export const mapReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SEARCH_PLACE":
			state.searchResults = action.payload
			return {...state}

		case "SHOW_AUTOCOMPLETE":
			state.autocomplete = action.payload
			return {...state}

		case "GET_PLACE":
			state.place = action.payload
			return {...state}

		case 'GET_USER_LOCATION':
			state.userLocation = action.payload
			return {...state}

		case "GET_SEARCH_LOCATION":
			state.searchLocation = action.payload
			return {...state}

		case "MOVE_CAMERA":
			state.moveCamera = action.payload
			return {...state}

		case "SHOW_OVERLAY":
			state.overlay = action.payload
			return {...state}

		default:
			return state
	}
}




