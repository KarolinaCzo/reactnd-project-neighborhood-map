import React, { Component } from 'react';
// Handle lazy loading, support parallel and sequential loading
// From: https://www.npmjs.com/package/react-async-script-loader
import scriptLoader from 'react-async-script-loader';
// Import the .json file with locations details
import locations from './components/locations.json';
// Import custom map style for the map
import { mapStyle } from './components/mapStyle.js';
// Import components
import FilterLocations from './components/FilterLocations';
// Import High Order Component which handles lazy loading, it supports parallel
// and sequential loading. From: https://www.npmjs.com/package/fetch-jsonp
import fetchJsonp from 'fetch-jsonp';
// Import css file
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Get the locations details from the 'locations.json' file
      alllocations: locations,
      requestWasSuccessful: true,
      map: '',
      infowindow: '',
      markerWithInfowindow: '',
      locationsInfo: ''
    };

    this.initMap = this.initMap.bind(this);
    this.openInfowindow = this.openInfowindow.bind(this);
    this.closeInfowindow = this.closeInfowindow.bind(this);
  }

  // Fetch the information about all the locations from MediaWikiAPI
  componentDidMount() {
    this.state.alllocations.map(location => {
      return fetchJsonp(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${
          location.title
        }&format=json&callback=wikiCallback`
      )
        .then(response => response.json())
        .then(responseData => {
          let fetchedInfo = [
            ...this.state.locationsInfo,
            [responseData, responseData[2][0], responseData[3][0]]
          ];
          this.updateData(fetchedInfo);
        })
        .catch(function() {
          console.log('Failed to fetch information');
        });
    });
  }

  // Update the information about locations
  updateData = fetchedInfo => {
    this.setState({
      locationsInfo: fetchedInfo
    });
  };

  // Check if the script load successfully or not
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    // If the script loaded successfully - initialize the map
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        this.initMap();
      } else {
        // If it didn't - handle the error
        console.log("Can't load the map!");
        this.setState({ requestWasSuccessful: false });
      }
    }
  }

  // Create a new map
  initMap() {
    const thisMap = this;

    // Tips on how to create a Google Map from:
    // https://www.w3schools.com/howto/howto_google_maps.asp
    let mapCanvas = document.getElementById('map');
    let mapOptions = {
      center: { lat: 51.526465, lng: -0.155971 },
      zoom: 15,
      styles: mapStyle,
      mapTypeControl: false
    };

    const map = new window.google.maps.Map(mapCanvas, mapOptions);

    let largeInfowindow = new window.google.maps.InfoWindow({});

    // Create a 'closeclick' event to close the infowindow
    largeInfowindow.addListener('closeclick', function() {
      thisMap.closeInfowindow();
    });

    // Create a 'click' event to close the infowindow when clicking somewhere on the map. Tip from:
    // https://stackoverflow.com/questions/10022873/closing-info-windows-in-google-maps-by-clicking-the-map
    window.google.maps.event.addListener(map, 'click', function() {
      thisMap.closeInfowindow();
    });

    let markersLocations = [];
    // Use the 'alllocations' array to create an array of markers on initialize
    this.state.alllocations.map(location => {
      let marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.position),
        animation: window.google.maps.Animation.DROP,
        title: location.title,
        map: map
      });

      // Create a 'click' event to open the infowindow at a marker
      marker.addListener('click', function() {
        thisMap.openInfowindow(marker);
      });

      location.marker = marker;

      // Push the markers to the array of 'markersLocations'
      return markersLocations.push(location);
    });

    this.setState({
      map: map,
      alllocations: markersLocations,
      infowindow: largeInfowindow
    });
  }

  // Open the infowindow for the marker
  openInfowindow(marker) {
    // First close the infowindow before opening any other infowindow
    this.closeInfowindow();
    // Open the infowindow on the correct marker
    this.state.infowindow.open(this.state.map, marker);
    // Set the marker animation to 'bounce'
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 400);
    }
    // Set the initial infowindow content to give the MediaWikiAPI time to load
    this.state.infowindow.setContent('Looking for info at Wikipedia...');
    // Call 'populateInfowindow' to add content to infowindow
    this.populateInfowindow(marker);

    this.setState({
      markerWithInfowindow: marker
    });

    // Center the marker with the infowindow on the map
    // Tip from: https://thewebdesignforum.co.uk/topic/787-google-map-center-map-and-info-window/
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
  }

  // Populate infowindow with content fetched from MediaWikiAPI
  populateInfowindow(marker) {
    let thisInfowindow = this;
    // Filter the data from 'locationsInfo'
    // On a side note: first .filter() then .map(). Map() runs the function once for
    // each item in the array - it's faster if the array is already filtered.
    let filterText = this.state.locationsInfo
      .filter(one => marker.title === one[0][0])
      .map(two => {
        if (two.length === 0) return 'No information has been found.';
        else if (two[1] !== '') return two[1];
        else return 'No information has been found.';
      });
    let filterLink = this.state.locationsInfo
      .filter(one => marker.title === one[0][0])
      .map(two => {
        if (two.length === 0) return 'https://www.wikipedia.org';
        else if (two[1] !== '') return two[2];
        else return 'https://www.wikipedia.org';
      });

    // Prepare the content for the infowindow
    let infowindowContent = `<div id="iw-container">
    <h3 class="iw-title" tabIndex="0">${marker.title}</h3>
    <hr>
    <h4 class="iw-description" tabIndex="0"> Description </h4>
    <p class="iw-text" tabIndex="0">${filterText}</p>
    <a class="iw-link" href=${filterLink} tabIndex="0">Read more at Wikipedia</a>
    </div>`;
    // Set the content of the infowindow
    thisInfowindow.state.infowindow.setContent(infowindowContent);
  }

  // Close the infowindow for the marker
  closeInfowindow() {
    // Change the animation from 'bounce' to 'null'
    if (this.state.markerWithInfowindow) {
      this.state.markerWithInfowindow.setAnimation(null);
    }
    // Close the infowindow
    this.state.infowindow.close();

    this.setState({
      markerWithInfowindow: ''
    });
  }

  render() {
    const { requestWasSuccessful } = this.state;
    return requestWasSuccessful ? (
      <div>
        <header className="header">
          <h3 tabIndex="0" className="title">
            <span className="title--bold">Neighborhood Map:</span> Marylebone,
            London
          </h3>
        </header>
        {/* Add FilterLocations component to the website */}
        {/* On a side note - if we want to use a prop in a component, we need to pass it to this component */}
        <FilterLocations
          alllocations={this.state.alllocations}
          openInfowindow={this.openInfowindow}
          closeInfowindow={this.closeInfowindow}
        />
        {/* Display map on the website */}
        <div
          id="map"
          role="application"
          aria-label="Map of Marylebone - district of London"
          tabIndex="0"
        />
      </div>
    ) : (
      <div>
        <h1 id="map-error">Can't load the app! Please try again later...</h1>
      </div>
    );
  }
}

// Get the 'apiKey' from the Google API site:
// https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ko
export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyCCvnRFU0hCHWqLHMNUtJ6jEvyy-TxkdeA&v=3`
])(App);
