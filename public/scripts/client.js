/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//uses createTweetElement by passing tweet object into it, uses the returned jQuery ojbect by attended it to the tweets container.
$(document).ready(function() {
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetMsg = createTweetElement(tweet);
      $('.existing-tweets-container').prepend(tweetMsg);
    }
  };

//escape function that prevents XSS attacks
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

//renders dynamic tweets and empties existing tweets container from html
  const createTweetElement = function(tweet) {
    const timeStamp = timeago.format(tweet.created_at);

    let $tweet = `<article class="existing-tweets">
  <header class="existing-tweets-header">
    
    <img src=${tweet.user.avatars}/>
    <div class="user-name"><b>${tweet.user.name}</b></div>
    <div class="user-handle"><b>${tweet.user.handle}</b></div>
  </header>
  <div class="existing-tweets-body"> <strong>${escape(tweet.content.text)}</strong></div>
  <footer class="existing-tweets-footer"><b>${timeStamp}</b>
    <div class="tweet-icons">
      <i id="icon1" class="fas fa-flag"></i>
      <i id="icon2" class="fas fa-retweet"></i>
      <i id="icon3" class="fas fa-heart"></i>
    </div>
  </footer>
  </article>`;

    return $tweet;
  };

//uses ajax to look at url '/tweets/ with get method and passes results to renderTweets, if error displays the error.
  const loadTweets = function() {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then(result => renderTweets(result))
      .catch(error => console.log(`Error:`, error));
  };

//handler for submit button functionality
  let error = false;
  const submitHandler = function(event) {
    event.preventDefault();
    let tweetBox = $('#tweet-box').val();
    const data = $(this).serialize();

//takes .JSON data from /tweets and sets tweet box to empty on successful submission also removes alert if it pops up and resets counter to 140.
    const tweetPost = function(data) {
      $.ajax({ url: '/tweets', method: 'POST', data: data }).then(() => {
        $('.existing-tweets-container').empty();
        $('#tweet-box').val('');
        $('.alert').empty();
        $('#counter').first().val(140);
        loadTweets();
      });
    };

//function to handle error messages, if tweet box is empty displays an error, if tweetbox is over 140 characters displays an error, if no errors are present allows the tweet to post.
    const errorHandler = function() {
      if (tweetBox.length === 0) {
        $('.alert')
          .empty()
          .append('<p><i class="fas fa-exclamation-circle"></i><strong>Your tweet needs to be atleast 1 character long.</strong</p>');
        $('.alert').hide().slideDown('slow');
        error = true;
      } else if (tweetBox.length > 140) {
        $('.alert')
          .empty()
          .append('<p><i class="fas fa-exclamation-circle"></i><strong>You\'ve reached the max amount of characters!</strong></p>');
        $('.alert').hide().slideDown('slow');
        error = true;
      } else {
        tweetPost(data);
        error = false;
      }
    };
    errorHandler();
  };

//when user scrolls down 30px displays a button, when the button is pressed returns the user to the top of the page.
  const scrollButton = document.getElementById("scroll-btn");
  window.onscroll = function() {
    scrollFunction();
  };

  const scrollFunction = function() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  };
    
  const topFunction = function() {
//for safari
    document.body.scrollTop = 0;
//for every other browser
    document.documentElement.scrollTop = 0;
  };
  $('#scroll-btn').on('click', () => {
    topFunction();
  });

//textbox listener that removes error when typing
  $('form').on('submit', submitHandler),
  $('#tweet-box').on('keyup', () => {
    if (error === true) {
      $('.alert').slideUp('slow');
      error = false;
    }
  });

//if user clicks the new tweet button the new tweet section slides up, click again to slide it down.
  $('#create-tweet').on('click', () => {
    $('.alert').hide();
    if ($('#new-tweet').hasClass('hide-tweet')) {
      $('#new-tweet').slideDown('slow', function() {
        $(this).removeClass('hide-tweet');
        $('.alert').empty();
      });
    } else {
      $('#new-tweet').slideUp('slow', function() {
        $(this).addClass('hide-tweet');
        $('.alert').empty();
      });
    }
  });
  loadTweets();
});