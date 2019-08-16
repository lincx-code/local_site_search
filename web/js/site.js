$(document).ready(function() {
  //Required for strict JS code
  "use strict";
  //Static Search box function *****************************************
  let baseURL = "";

  $("#search").keypress(function(e) {
    let key = e.which;

    if (key === 13) {
      //alert("Enter key pressed");
      let searchTerm = $(this).val();

      if (!searchTerm) {
        alert("Please enter the search criteria");
        return;
      } else {
        //alert("User wants to search for: " + searchTerm);
        window.location.href =
          baseURL + "search_results.html?search=" + searchTerm;
      }
    }
  });
});
