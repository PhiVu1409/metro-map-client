import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import trainService from '../services/trainService';
import {useParams} from 'react-router-dom'

const MapContaineInfoTrain = (props) => {
  const [train, setTrain] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await trainService.getAllTrainByTrainLine(id);
        setTrain(response.data);
        console.log('Data from API:', response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const onMarkerClick = (props, marker, e) => {
    const selectedTrain = train.find(item => item._id === props.id);

    if (selectedTrain) {
      setActiveMarker(marker);
      setSelectedPlace(selectedTrain);
      setShowingInfoWindow(true);
    } else {
      console.error(` Không tìm thấy ga: ${props.id}`);
    }
  };

  

  const onClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const markers = train.map((trainItem) => {
    const position = {
      lat: trainItem.lat,
      lng: trainItem.lng
    };

    return (
      <Marker
        key={trainItem._id}
        id ={trainItem._id}
        position={position}
        title={trainItem.tenGa}
        onClick={onMarkerClick}
      />
    );
  });

  return (
    <div>
      <Map
        google={props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={train.length > 0 ? train[0].coordinates : { lat: 21.005708084325082,lng: 105.75430037206895, }}
      >
        {markers}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          {selectedPlace && (
            <div>
              {console.log(selectedPlace)}
              <h3>{selectedPlace.tenGa}</h3>
              <p>{selectedPlace.diaChi}</p>
            </div>
          )}
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyARFz6QooEJhlJCaSmNRsGFK7sa5xcMY90",
})(MapContaineInfoTrain);
