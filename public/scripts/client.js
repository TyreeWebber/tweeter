/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetMsg = createTweetElement(tweet);
      $('.existing-tweets-container').prepend(tweetMsg);
    }
  };

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  const loadTweets = function() {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then(result => renderTweets(result))
      .catch(error => console.log(`Error:`, error));
  };

  let error = false;
  const submitHandler = function(event) {
    event.preventDefault();
    let tweetBox = $('#tweet-box').val();
    const data = $(this).serialize();

    const tweetPost = function(data) {
      $.ajax({ url: '/tweets', method: 'POST', data: data }).then(() => {
        $('.existing-tweets-container').empty();
        $('#tweet-box').val('');
        $('.alert').empty();
        $('#counter').first().val(140);
        loadTweets();
      });
    };

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

  const scrollButton = document.getElementById("scroll-btn");
  window.onscroll = function() {
    scrollFunction();
  };
    
  const scrollFunction = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  };
    
  const topFunction = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  $('#scroll-btn').on('click', () => {
    topFunction();
  });
    
  $('form').on('submit', submitHandler),
  $('#tweet-box').on('keyup', () => {
    if (error === true) {
      $('.alert').slideUp('slow');
      error = false;
    }
  });

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