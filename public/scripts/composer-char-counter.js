$(document).ready(function() {
  $("#tweet-box").on("input", function (event) {
    let $formInput = $(this);
    let $forms = $formInput.closest("form");
    let $textCount = $forms.find("#tweet-box");
    let textLength = $textCount.val().length;
    let charLeft = 140 - textLength;
    let counterColor = $("#counter").val(charLeft);

    if (charLeft < 0) {
      counterColor.css("color", "red");
    } else {
      counterColor.css("color", "white");
    }
  });
});