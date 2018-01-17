# Tech Action Working Group
A static website for the NYC Tech Action Working Group

[![CircleCI](https://circleci.com/gh/nycdsa/tech-action-working-group.svg?style=svg)](https://circleci.com/gh/nycdsa/tech-action-working-group)

This is just a regular [Jekyll](https://jekyllrb.com) site.

## Installation and running locally
1. `bundle install`
2. `npm install`
3. `bundle exec jekyll serve`
4. `npm run watch:js`

*Annoying caveat*

You have to re-save the `js` file `src/assets/main.js` after you save other files bc `jekyll` overwrites it in the `/dist` folder. Hopefully we can fix this in the future.

## Deployment (TODO)
The app is deployed to S3 with every commit to `master`.
