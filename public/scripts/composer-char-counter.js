$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    //stores form input
    let $formInput = $(this);

    //target closest element to the form
    let $form = $formInput.closest('form');

    //target text-box input
    let $textCount = $form.find("#tweet-text");

    //capture length of tweet
    let textLength = $textCount.val().length;
    let charLeft = 140 - textLength;

    //capture value of counter
    let counterColor = $(".counter").val(charLeft);

    if (charLeft < 0) {
      counterColor.css("color", "red");
    } else {
      counterColor.css("color", "white");
    }
  });
});