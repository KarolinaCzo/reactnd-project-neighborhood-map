import React, { Component } from 'react';
// Import components
import Location from './Location';
// Import the RegExp
// From: https://github.com/sindresorhus/escape-string-regexp
import escapeRegExp from 'escape-string-regexp';
// Import css file
import './FilterLocations.css';

class FilterLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationsSearchResults: this.props.alllocations,
      query: ''
    };
  }

  // Filter the locations according to the user input ('query')
  filterLocations = query => {
    // Close previously opened infowindow
    this.props.closeInfowindow();

    // If the 'query' matches the location name ('place.title')
    // create a new array with those locations('filteredLocations'),
    // show the markers of the matching locations and hide other markers.
    let filteredLocations = [];
    const match = new RegExp(escapeRegExp(query), 'i');
    this.props.alllocations.forEach(function(place) {
      if (match.test(place.title)) {
        place.marker.setVisible(true);
        filteredLocations.push(place);
      } else {
        place.marker.setVisible(false);
      }
    });

    // Change the state of 'locationsSearchResults' to the 'filteredLocations'
    this.setState({
      locationsSearchResults: filteredLocations
    });
  };

  // Update the state of the 'query' with the user input
  updateQuery = query => {
    this.setState({
      query: query.trim()
    });
    // Call the 'filterLocations' function
    this.filterLocations(query);
  };

  render() {
    return (
      <div className="filter-container">
        {/* Display the filter input on the website */}
        <input
          className="filter-box"
          tabIndex="0"
          role="search"
          aria-labelledby="Filter the list of locations at Marylebone,
          London"
          type="text"
          placeholder="Filter locations"
          onChange={event => this.updateQuery(event.target.value)}
        />
        {/* Display the location list on the website */}
        <ul className="filter-list">
          {this.state.locationsSearchResults.map(location => (
            <Location
              key={location.key}
              openInfowindow={this.props.openInfowindow.bind(this)}
              locationDetails={location}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default FilterLocations;
