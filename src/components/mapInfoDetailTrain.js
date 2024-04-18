import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import trainService from '../services/trainService';
import {useParams} from 'react-router-dom'

const MapContainerInfoDetailTrain = ({ google }) => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [train, setTrain] = useState([]);
    const {id} = useParams(); 
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await trainService.getTrainById(id);
            setTrain(response.data);
            console.log('Data from API:', response.data)
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, [id]);

    const onMarkerClick = (props, marker, e) => {
        setActiveMarker(marker);
        setSelectedPlace(props);
        setShowingInfoWindow(true);
    };

    const onClose = (props) => {
        if (showingInfoWindow) {
        setActiveMarker(null);
        setShowingInfoWindow(false);
        }
    };

    const mapStyles = {
        width: '100%',
        height: '100%',
    };

    return (
        <Map
        google={google}
        zoom={13}
        style={mapStyles}
        initialCenter={{
            lat: 21.005708084325082,
            lng: 105.75430037206895,
        }}
        >
        <Marker
            position={{ lat: train.lat, lng: train.lng }}
            title={train.tenGa}
            address={train.diaChi}
            onClick={onMarkerClick}
        />

        <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onClose}
        >
            <div>
            {selectedPlace && (
                <div>
                {console.log(selectedPlace)}
                <h3>{selectedPlace.title}</h3>
                <p>{selectedPlace.address}</p>
                </div>
            )}
            </div>
        </InfoWindow>
        </Map>
    );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyARFz6QooEJhlJCaSmNRsGFK7sa5xcMY90',
})(MapContainerInfoDetailTrain);
