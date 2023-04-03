# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Links

- Solution URL: [here](https://github.com/rafaeldevvv/job-listings-challenge)
- Live Site URL: [here](https://rafaeldevvv.github.io/job-listings-challenge/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

This time I tried to organize more the code by splitting the code into files:
- Footer.js
- helpers.js
- index.js
- job.js
- lists.js
- Main.js
It's my first time doing it. I know this is not be the best organization ever, but I'll practice more and improve my skills.

I also used webpack to bundle all the files into one minified file. This also lets me use import statements as much as I want.

I had to specify a column gap of 3rem here because the aspect ratio for height 100% wasn't working quite well. Although the width was right according to the height, the buttons were overlapping the list items.
```scss
.special-list.remove {
  column-gap: 3rem;
  li {
    display: flex;
  }

  .special-list-item {
    font-size: 1.1rem;
    border-radius: 0.3rem 0 0 0.3rem;
  }

  .remove-btn {
    border-radius: 0 0.3rem 0.3rem 0;
    background-color: $desaturated-dark-cyan;
    transition: background-color 0.4s;
    position: relative;
    height: 100%;
    aspect-ratio: 1;

    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate((-50%, -50%));
    }
  }
  .remove-btn:hover {
    background-color: $very-dark-grayish-cyan;
  }
}
```

### Useful resources

- [chatGPT](https://chat.openai.com/chat) - What an amazing technology 👍.

## Author

- Frontend Mentor - [@rafaeldevvv](https://www.frontendmentor.io/profile/rafaeldevvv)
- Twitter - [@rafaeldevvv](https://www.twitter.com/rafaeldevvv)
- Instagram - [@rafaeldevvv](https://www.instagram.com/rafaeldevvv)
