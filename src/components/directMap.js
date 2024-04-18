import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, IconButton, ButtonGroup } from '@mui/material';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import styled from 'styled-components';

export default function DirectionMapTest({ onStartDirection }) {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const TextFieldStyled = styled(TextField)`
    width: 100%;
  `;

  const ButtonGroupStyled = styled(ButtonGroup)`
    display: grid;
    width: 100%;
    margin-top: 5px;
  `;
  const ButtonStyled = styled(Button)`
    width: 90%;
  `;
  const handleButtonSwarpClick = () => {
    setStartPoint(endPoint);
    setEndPoint(startPoint);
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyARFz6QooEJhlJCaSmNRsGFK7sa5xcMY90&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleMaps;

      document.head.appendChild(script);
    };

    const initializeGoogleMaps = () => {
      // Now it's safe to use window.google.maps
      const startAutocomplete = new window.google.maps.places.Autocomplete(
        startInputRef.current,
        {
          fields: ['place_id', 'formatted_address'],
          componentRestrictions: { country: 'VN' },
        }
      );
      startAutocomplete.addListener('place_changed', () => {
        const place = startAutocomplete.getPlace();
        setStartPoint(place.formatted_address);
      });

      const endAutocomplete = new window.google.maps.places.Autocomplete(
        endInputRef.current,
        {
          fields: ['place_id', 'formatted_address'],
          componentRestrictions: { country: 'VN' }
        }
      );
      endAutocomplete.addListener('place_changed', () => {
        const place = endAutocomplete.getPlace();
        setEndPoint(place.formatted_address);
      });
    };

    // Load Google Maps API script
    loadGoogleMapsScript();

    // Clean up script on component unmount
    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleButtonClick = () => {
    onStartDirection(startPoint, endPoint);
  };

  return (
    <div>
      <div className='direction-container'>
        <div className="direction-control">
          <div className='direction-textfill'>
            <p className='header-title'>Tìm đường:</p>
            <TextFieldStyled
              name='search-info'
              id="outlined-basic-start"
              margin="dense"
              label="Điểm xuất phát"
              size="small"
              inputRef={startInputRef}
            />
            <TextFieldStyled
              name='search-info'
              id="outlined-basic-end"
              margin="dense"
              label="Điểm kết thúc"
              size="small"
              inputRef={endInputRef}
            />
          </div>
          <div className='button'>
            <ButtonGroupStyled variant="contained" aria-label="outlined primary button group">
              <ButtonStyled variant="contained" onClick={handleButtonClick}>
                Bắt đầu
              </ButtonStyled>
              <IconButton aria-label="swap" onClick={handleButtonSwarpClick}>
                <SwapVerticalCircleIcon />
              </IconButton>
            </ButtonGroupStyled>
          </div>
        </div>
        <div className="direction-info">
          <p>Đường đi</p>
        </div>
      </div>
    </div>
  );
}

