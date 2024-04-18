import React, { useState, useEffect } from 'react';
import TrainService from '../services/trainService';
import { useParams } from 'react-router-dom';

function InfoDetailTrain() {
  const [train, setTrain] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchTrainDetail(id);
  }, [id]);

  const fetchTrainDetail = (id) => {
    TrainService.getTrainById(id)
      .then((response) => {
        console.log (response.data);
        setTrain(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
  <div className="detail-info">
        <p className="label">Số thứ tự ga: {train.sTTGa}</p>
        <p className="label">Tên ga: {train.tenGa}</p>
        <p className="label">Thời gian: {train.thoiGian}</p>
        <p className="label">Địa chỉ: {train.diaChi}</p>
        <p className="label">Mô tả: {train.moTa}</p>
        <p className="label">Trạng thái: <span className={train.trangThai ? 'status-active' : 'status-inactive'}>{train.trangThai ? 'Đang hoạt động' : 'Dừng hoạt động'}</span></p>
  </div>
  );
}

export default InfoDetailTrain;