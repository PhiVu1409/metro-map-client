import React, { useState, useEffect } from 'react';
import TrainService from '../services/trainService';
import { useParams, Link, useNavigate } from 'react-router-dom';

function TrainDetail() {
  const [train, setTrain] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const deleteTrain = () => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa ga này?'); 
    if (confirmDelete) {
      TrainService.deleteTrain(id)
        .then((response) => {
          navigate('/admin/Tàu/'+train.idTrainLine);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
  <div className="train-line-detail">
    {train && Object.keys(train).length > 0 ? (
      <div>
        <h2>Chi tiết ga tàu</h2>
        <p className="label">Số thứ tự ga: {train.sTTGa}</p>
        <p className="label">Tên ga: {train.tenGa}</p>
        <p className="label">Thời gian: {train.thoiGian}</p>
        <p className="label">Địa chỉ: {train.diaChi}</p>
        <p className="label">Vĩ độ: {train.lat}</p>
        <p className="label">Kinh độ: {train.lng}</p>
        <p className="label">Mô tả: {train.moTa}</p>
        <p className="label">Trạng thái: <span className={train.trangThai ? 'status-active' : 'status-inactive'}>{train.trangThai ? 'Đang hoạt động' : 'Dừng hoạt động'}</span></p>
      </div>
    ) : (
      <p>Đang tải...</p>
    )}
    <button className="btn margin2 btn-danger float-right margin-2" onClick={deleteTrain}>
      Xóa ga
    </button>
    <Link style={{ textDecoration: 'none' }} to= {"/admin/Tàu/"+ train.idTrainLine} className="btn btn-secondary float-right margin-2">
      Hủy
    </Link>
  </div>
  );
}

export default TrainDetail;