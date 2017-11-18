import $ from "jquery-ajax";

import { fetchItems } from './api';

export function addNewItem(item) {
  return function(dispatch) {
      // This is here for future functionality.
      $.ajax({
          url: "/api/menuitems/",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(item)
      }).done(function() {
          // After making the change, fetch the updated menu items list.
          dispatch(fetchItems());
      });
  };
};