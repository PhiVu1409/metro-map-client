import React,{useState} from 'react'
import { TextField, Button, IconButton, ButtonGroup } from '@mui/material'
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';

import styled from 'styled-components';

export default function DirectionMap() {
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');

    const TextFieldStyled = styled(TextField)`
    width: 100%;
    `

    const ButtonGroupStyled = styled(ButtonGroup)`
    display: grid;
    width: 100%;
    margin-top: 5px;
    `
    const ButtonStyled = styled(Button)`
    width: 90%;
    `
    const handleButtonClick = () => {
        setStartPoint(endPoint);
        setEndPoint(startPoint);
      };
    
    return (
        <div>
            <div className='direction-container' >
                <div className="direction-control">
                    <div className='direction-textfill'>
                        <p className='header-title'>Tìm đường:</p>
                        <TextFieldStyled name='search-info'
                            id="outlined-basic"
                            margin="dense"
                            label="Điểm xuất phát"
                            size="small"
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)} ></TextFieldStyled>
                        <TextFieldStyled name='search-info'
                            id="outlined-basic"
                            margin="dense"
                            label="Điểm kết thúc"
                            size="small"
                            value={endPoint}
                            onChange={(e) => setEndPoint(e.target.value)} ></TextFieldStyled>
                    </div>
                    <div className='button'>
                        <ButtonGroupStyled variant="contained" aria-label="outlined primary button group">
                            <ButtonStyled
                                variant="contained"
                            >Bắt đầu</ButtonStyled>

                            <IconButton aria-label="swap"
                            onClick={handleButtonClick} >
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
    )
}
