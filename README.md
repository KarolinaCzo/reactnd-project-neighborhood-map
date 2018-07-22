# Neighborhood Map with React Project

## Table of Contents

- Basic information
- Instructions
- Helpful information

## Basic information

### Name

Neighborhood Map with React

### Project Overview

A project made during the Udacity Front-End Web Developer Nanodegree.

For this project, my role was to develop a single page application featuring a map of my neighborhood or a neighborhood I would like to visit. I had to add functionality to this map including: highlighted locations, third-party data about those locations and various ways to browse the content.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and evaluated by a Udacity code reviewer according to the [Neighborhood Map project rubric.](https://review.udacity.com/#!/rubrics/1351/view).

### Description

This single-page application is featuring a map of a neighborhood I would like to visit : Marylebone - district of London.
Additional functionalities include: map markers to identify locations, a search function to easily discover these locations, and a list view to support simple browsing of all locations. A third-party API - MediaWiki - provides additional information about each of the locations.

## Instructions

Steps to view the project:

1.  Fork and clone this repository.
2.  From inside of the new directory:

- open the terminal
- install all project dependencies with `npm install`
- start the development server with `npm start` (the website should open in your browser at `http://localhost:3000/`)

### Service worker

The assets will only be cached when we run the project in production mode.

Follow these steps to run the build for testing the service worker:

- open the terminal from inside of the project directory
- create an optimized production build with `npm run build`
- serve it with a static server by running `npm install -g serve` and `serve -s build`, and opening your browser at `http://localhost:5000/` or deploy it to a specific address of your choice

## Helpful information

Links to the resources I used in my project that could be helpful for other developers:

- React JS course at Udacity
  https://eu.udacity.com/course/react-nanodegree--nd019

- React Docs
  https://reactjs.org/

- Google Maps Platform - Documentation
  https://developers.google.com/maps/documentation/

- Get the 'apiKey' from the Google API site
  https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ko

- Geocoder
  https://google-developers.appspot.com/maps/documentation/utils/geocoder/

- MediaWiki
  https://www.mediawiki.org/wiki/API:Main_page

- react-async-script-loader
  https://www.npmjs.com/package/react-async-script-loader

- Fetch JSONP
  https://www.npmjs.com/package/fetch-jsonp

- Links and new windows - accessibility
  https://accessibility.oit.ncsu.edu/it-accessibility-at-nc-state/developers/accessibility-handbook/mouse-and-keyboard-events/links/links-and-new-windows/

- how to center map and info window
  https://thewebdesignforum.co.uk/topic/787-google-map-center-map-and-info-window/

- pixels to rem converter
  https://www.ninjaunits.com/converters/pixels/pixels-rem/

- service worker information
  https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#offline-first-considerations

- infowindow closeclick event
  https://stackoverflow.com/questions/3947950/infowindow-closeclick-event-in-googlemaps-v3-being-fired-too-soon

Links to other resources are added as comments in the code.
