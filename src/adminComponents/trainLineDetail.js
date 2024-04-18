import React, { useState, useEffect } from 'react';
import TrainLineService from '../services/trainLineService';
import { useParams, Link, useNavigate } from 'react-router-dom';

function TrainLineDetail() {
  const [trainLine, setTrainLine] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrainLineDetail(id);
  }, [id]);

  const fetchTrainLineDetail = (id) => {
    TrainLineService.getTrainLineById(id)
      .then((response) => {
        console.log (response.data);
        setTrainLine(response.data);
      })
      .catch((error) => {
        console.error('Error fetching train line:', error);
      });
  };

  const deleteTrainLine = () => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa tuyến tàu này?');
    if (confirmDelete) {
      TrainLineService.deleteTrainLine(id)
        .then((response) => {
          console.log(response.data);
          navigate('/admin/Tuyến tàu');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
  <div className="train-line-detail">
    {trainLine && Object.keys(trainLine).length > 0 ? (
      <div>
        <h2>Chi tiết tuyến tàu</h2>
        <p className="label">Số tuyến tàu: {trainLine.soTuyenTau}</p>
        <p className="label">Tên tuyến tàu: {trainLine.tenTuyenTau}</p>
        <p className="label">Độ dài tuyến tàu: {trainLine.doDaiTuyenTau} Km</p>
        <p className="label">Thời gian bắt đầu: {trainLine.thoiGianBatDau}</p>
        <p className="label">Thời gian kết thúc: {trainLine.thoiGianKetThuc}</p>
        <p className="label">Giá vé: {trainLine.giaVe ? trainLine.giaVe.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : '-'}</p>
        <p className="label">Khu vực: {trainLine.khuVuc}</p>
        <p className="label">Mô tả: {trainLine.moTa}</p>
        <p className="label">Trạng thái: <span className={trainLine.trangThai ? 'status-active' : 'status-inactive'}>{trainLine.trangThai ? 'Đang hoạt động' : 'Dừng hoạt động'}</span></p>
      </div>
    ) : (
      <p>Đang tải...</p>
    )}
    <button className="btn margin2 btn-danger float-right margin-2" onClick={deleteTrainLine}>
      Xóa tuyến tàu
    </button>
    <Link style={{ textDecoration: 'none' }} to="/admin/Tuyến tàu" className="btn btn-secondary float-right margin-2">
      Hủy
    </Link>
  </div>
  );
}

export default TrainLineDetail;