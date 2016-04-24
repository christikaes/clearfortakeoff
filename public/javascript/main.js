$(function() {

  var showView = function (page) {
    $(".contents").hide();
    $("." + page).fadeIn("slow");
  }

  showView("input");

  $("#submit").on("click", function(e) {
      showView("loading");

      e.preventDefault();
      var flightNumber = $("#flightNumberInput").val();
      $.get("/flightdetails/" + flightNumber)
          .done(function(response) {
              console.log("success:");
              console.log(response);
              var result = response.split(" ");
              var n = parseFloat(result[0]);
              var y = parseFloat(result[1]);

              var p;

              if (n > y) {
                $("#result").text("I'm " + (n * 100) + "% sure your flight isn't delayed!");
                p=n*100 + "%";
              } else {
                $("#result").text("Chance of delays " + (y * 100) + "%");
                p=y*100 + "%";
              }

              $(".determinate").css("width", p)

              showView("result");
          })
          .fail(function() {
              console.log("failed");
              showView("input");
              showView("result");
          });
    });

    $("#redo").on("click", function(e) {
        showView("input");
    });
});
