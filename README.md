# Furniture
**Furniture** - this is a simple resume store site where you can see the *shopping cart*, *loading products* using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
___
## QUICK START
Download this progect to your computer.
1. Open your the command line Git and download the packages.
   ```
    npm i
   ```
2. We need to go to our project folder. Open file ***js-on.js***
* data
* dist
* favicons
* fonts
* img
* node_modules
* prebuild
* scripts
  * js-on.js 
* styles
* .gitignore
* README.md
* cart.html
* gulpfile.js
* index.html
* package-lock.json
* package.json
3. Now we need to change the link. Change `linkForGithub` to `linkForGulp`
  ```JavaScript
  fetch(linkForGithub).then(response => {
    return response.json();
  }).then(data => {
   ```
4. Now we start the project.
   ```
   gulp build
   ```
:white_check_mark:
