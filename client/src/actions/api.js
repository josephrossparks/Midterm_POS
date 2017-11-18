import $ from "jquery-ajax";

export function fetchItems() {
    return function(dispatch) {
        dispatch(requestItems());
        $.get("/api/menuitems").done(function(data) {
            dispatch(receiveItems(data));
        });
    };
}

function requestItems() {
    return {
        type: "REQUEST_ITEMS"
    };
}

function receiveItems(items) {
    return {
        type: "RECEIVE_ITEMS",
        items
    };
}
