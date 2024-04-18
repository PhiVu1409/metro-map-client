import React, { useState, useEffect } from 'react';
import TrainService from '../services/trainService';
import { Link, useParams } from 'react-router-dom'
import InfoDetailTrain from './infoDetailTrain'

export default function BodyLeftInfoDetailTrain() {
  const [train, setTrain] = useState([]);
  const { id } = useParams();

  const fetchTrainDetail = (id) => {
    TrainService.getTrainById(id)
      .then((response) => {
        console.log(response.data);
        setTrain(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTrainDetail(id);
  }, [id]);

  return (
    <div className='bodyLeft'>
      <div className='map-info'>
        <div className='info-list-train'>
          <div className='button-exit'>
            <Link to={'/listtrain/' + train.idTrainLine}>{"<"}Trở lại</Link>
          </div>
          <h2>Thông tin ga</h2>
          <InfoDetailTrain />
        </div>
      </div>
    </div>
  )
}

