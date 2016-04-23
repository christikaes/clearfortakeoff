$ = require("jquery");

$(function() {
    $("input[type='submit']").on("click", function(e) {
        e.preventDefault();
        var flightNumber = $("input[name='flight-number']").val();
        $.get("/flightdetails/" + flightNumber)
            .done(function(response) {
                console.log(response);
            })
            .fail(function() {
                console.log("failed");
            });
    });
});
