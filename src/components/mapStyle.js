// I used a map style from the Udacity's Google Maps APIs course
// Repository of this course with code examples can be found here:
// https://github.com/udacity/ud864
export const mapStyle = [
  {
    featureType: 'water',
    stylers: [{ color: '#19a0d8' }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#ffffff' }, { weight: 6 }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e85113' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#efe9e4' }, { lightness: -40 }]
  },
  {
    featureType: 'transit.station',
    stylers: [{ weight: 9 }, { hue: '#e85113' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ lightness: 100 }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ lightness: -100 }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#f0e4d3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#efe9e4' }, { lightness: -25 }]
  }
];
