import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import './css/components.css';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TramIcon from '@mui/icons-material/Tram';
import TrainService from '../services/trainService';
import InfoIcon from '@mui/icons-material/Info';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 350,
  }));
  

export default function InfoTrain() {

  const [train, setTrain] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllTrainByTrainLine(id);
  }, [id]);

  const getAllTrainByTrainLine = (id) => {
    TrainService.getAllTrainByTrainLine(id)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTrain(response.data);
        } else {
          console.error(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const Train = train.map((trainItem)=> {
   return(
    <Item
      sx={{
        my: 2,
        mx: 'auto',
        p: 2,
      }}
      key={trainItem._id}
    >
      <Stack spacing={1} direction="row" justifyContent="space-around" alignItems="center">
        <Avatar><TramIcon/></Avatar>
        <Typography noWrap >{trainItem.tenGa}</Typography>
        <Link style={{ textDecoration: 'none' }} to= {"/detailtrain/"+trainItem._id}><InfoIcon/></Link>
      </Stack>
    </Item>
   );
  });

  return ( 
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 0.5 }}>
    {Train}
    </Box>
  )
}
