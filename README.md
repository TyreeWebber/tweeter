# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express back-end skills.

## Purpose
---
This is a project by [Tyree Webber](https://github.com/TyreeWebber) and was created as part of the [Lighthouse Labs](https://www.lighthouselabs.ca/) curriculum. It is not intended for professional use. ~~if you are using it for professional use please pay me i'm poor.~~

## Final Product
---
!["Screenshot of responsive design with textbox open"](https://github.com/TyreeWebber/tweeter/blob/master/public/images/screenshots/responsive%20design%20with%20textbox.png)

!["Screenshot of responsive design without textbox open"](https://github.com/TyreeWebber/tweeter/blob/master/public/images/screenshots/responsive%20design%20without%20textbox.png)

!["Screenshot of Tweeter with max character error displayed"](https://github.com/TyreeWebber/tweeter/blob/master/public/images/screenshots/tweeter%20max%20character%20error.png)

!["Sceenshot of Tweeter with min character error displayed"](https://github.com/TyreeWebber/tweeter/blob/master/public/images/screenshots/tweeter%20min%20character%20error.png)

!["Screenshot of Tweeter with new tweet box displayed"](https://github.com/TyreeWebber/tweeter/blob/master/public/images/screenshots/tweeter%20new%20tweet.png)

!["Screenshot of Tweeter with existing tweets/tweet box hidden"](https://github.com/TyreeWebber/tweeter/blob/master/public/images/screenshots/tweeter%20no%20textbox.png)

## Dependencies
---
- Body-Parser 1.15.2
- Express
- Node 5.10.x or above
- md5 2.1.0

## Dev Dependencies
---
- nodemon 2.0.16

## Getting Started
---
1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## File Structure & Descriptions
---
### Directories
---
## [public](https://github.com/TyreeWebber/tweeter/tree/master/public)
- Contains all publically accessible files used by the application.

[images](https://github.com/TyreeWebber/tweeter/tree/master/public/images)

- Contains the hexagon profile picture as well as my screenshots.

[scripts](https://github.com/TyreeWebber/tweeter/tree/master/public/scripts)

- Contains all JavaScript Files used in the project.

[styles](https://github.com/TyreeWebber/tweeter/tree/master/public/styles)

- Contains all CSS Files used in the project.

[vendor](https://github.com/TyreeWebber/tweeter/tree/master/public/vendor)

- Contains third party code used in the project 

## [server](https://github.com/TyreeWebber/tweeter/tree/master/server)

- Contains all server-side logic used in the project
---

## File Descriptions

[index.html](https://github.com/TyreeWebber/tweeter/blob/master/public/index.html)

- Contains the HTML markup for the project

## [client.js](https://github.com/TyreeWebber/tweeter/blob/master/public/scripts/client.js)

- Contains all client-side logic for the project
---
- loadTweets: used to submit a GET request to the /tweets/ route to receive the array of posted tweets, also empties and resets the form.

- createTweetElement: renders HTML markup for a tweet. uses template literals to dynamically insert user inputs.

- renderTweets: accepts an array of objects containing the tweeter user's data, also prepends items to the DOM.

- escape: escapes XSS scripts

- errorHandler: checks for input field errors and if an error is present gives an error message, if not allows the tweet to be posted.

- scrollFunction: when the use user scrolls more than 30px it prompts a button to appear.

- topFunction: appears when the user scrolls more than 30px if clicked it returns the user to the top of the page body.

## [composer-char-counter.js](https://github.com/TyreeWebber/tweeter/blob/master/public/scripts/composer-char-counter.js)
- updates the counter as the tweet is written. Listens for user inputs to increase/decrease the counter.