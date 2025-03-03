/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //renders tweets and prepends new tweet to tweet container
  const renderTweets = function (tweetData) {
    // const $container = $(".tweets-container").empty();
    $(".tweets-container").html(" ");
    for (let tweet of tweetData) {
      // console.log(tweet);
      // $container.prepend(createTweetElement(tweet));
      createTweetElement(tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const escape = function (str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // //changes time from unix time to days
    const time = new Date(tweet.created_at);
    const currentTime = Date.now();
    const dayDiff = Math.floor((currentTime - time) / 1000 / 60 / 60 / 24);

    //outline for tweet container
    const $tweet = $(`
      <article class="article">
        <header class="tweet-header">
          <div class="user-info">
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </div>
          <div class="user-mention">
            <p>${tweet.user.handle}</p>
          </div>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer class="tweet-footer">
          <h6>${dayDiff} days ago</h6>
          <p class="icons">
            <i id="icon1" class="fas fa-flag"></i>
            <i id="icon2" class="fas fa-retweet"></i>
            <i id="icon3" class="fas fa-heart"></i>
          </p>
        </footer>
      </article>
  `);
    $(".tweets-container").prepend($tweet);
  };

  //append outline to the article class
  // const $tweet = $(`<article>`);
  //   $tweet.addClass("article");
  //   const tweetArticle = $tweet.prepend(tweetElement);
  //   return tweetArticle;
  // };

  $(".tweet-form").submit(function (event) {
    event.preventDefault();
    // const formData = $(this).serialize();
    const value = $("#tweet-text").val();

    if (value.length > 140) {
      $(".error-length").slideDown();
      return;
    }

    if (value.length === 0) {
      $(".error-empty").slideDown();
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(".tweet-form").serialize(),
    }).then(loadTweets);
  });

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" }).then(renderTweets);
    // dataType: "json"
    // $(".counter").html('140');
    // $("#tweet-text").val('');
  };

  loadTweets();
});
