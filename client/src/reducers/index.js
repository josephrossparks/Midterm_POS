const INITIAL_STATE = {
	menuItems: [],
	isLoading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "REQUEST_ITEMS":
      return requestItems(state);
    case 'RECEIVE_ITEMS':
      return receiveItems(state, action);
    default:
      return state;
  }
}

function requestItems(state) {
  return Object.assign({}, state, {
    menuItems: [],
    isLoading: true
  });
}

function receiveItems(state, action) {
  return Object.assign({}, state, {
    menuItems: action.items,
    isLoading: false
  });
}
