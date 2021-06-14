export const searchPlace = (term) => (
	{
		type: "SEARCH_PLACE",
		payload: term
	}

)

export const showAutocomplete = (show) => (
	{
		type: 'SHOW_AUTOCOMPLETE',
		payload: show
	}
)

export const getPlace = (place) => (
	{
		type: 'GET_PLACE',
		payload: place
	}
)

export const getUserLocation = (location) => (
	{
		type: 'GET_USER_LOCATION',
		payload: location
	}
)

export const getSearchLocation = (location) => (
	{
		type: "GET_SEARCH_LOCATION",
		payload: location
	}
)

export const moveCamera = (move) => (
	{
		type: 'MOVE_CAMERA',
		payload: move
	}
)

export const showOverlay = (over) => (
	{
		type: 'SHOW_OVERLAY',
		payload: over
	}
)

