/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const tweetMsg = createTweetElement(tweet);
    $(".existing-tweets-container").append(tweetMsg);
  }
};

const createTweetElement = function(tweet) {
  const timeStamp = timeago.format(tweet.created_at);
  let $tweet = `<article class="existing-tweets">
<header class="existing-tweets-header">
  <div class="tweeter-avatar"> <img src="${tweet.user.avatars}"/> </div>
  <div class="user-name"><b>${tweet.user.name}</b></div>
  <div class="user-handle"><b>${tweet.user.handle}</b></div>
  </header>
<div class="existing-tweets-body"> <strong>${tweet.content.text}</strong></div>
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

renderTweets(data);
