import React from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

const MapComponent = withGoogleMap(({ directions }) => (
  <GoogleMap defaultZoom={7} defaultCenter={{ lat: 41.8507300, lng: -87.6512600 }}>
    {directions && <DirectionsRenderer directions={directions} />} 
  </GoogleMap>
));

export default MapComponent;