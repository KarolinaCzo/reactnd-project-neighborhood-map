import React from 'react';
// Import css file
import './Location.css';

class Location extends React.Component {
  render() {
    return (
      <li
        className="location-list-element"
        role="button"
        tabIndex="0"
        // Open infowindow on key press
        onKeyPress={this.props.openInfowindow.bind(
          this,
          this.props.locationDetails.marker
        )}
        // Open infowindow on click
        onClick={this.props.openInfowindow.bind(
          this,
          this.props.locationDetails.marker
        )}
      >
        {/* Display the name of the location */}
        {this.props.locationDetails.title}
      </li>
    );
  }
}

export default Location;
