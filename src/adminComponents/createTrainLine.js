import React, { useState } from 'react';
import TrainLineService from '../services/trainLineService';
import { useNavigate, Link } from 'react-router-dom';

function CreateTrainLineComponent() {
  const [newTrainLine, setNewTrainLine] = useState({
    soTuyenTau: '',
    tenTuyenTau: '',
    doDaiTuyenTau: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    giaVe: '',
    khuVuc: '',
    moTa: '',
    trangThai: '',
  });

  const [errors, setErrors] = useState({
    soTuyenTau: '',
    tenTuyenTau: '',
    doDaiTuyenTau: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    giaVe: '',
    khuVuc: '',
    moTa: '',   
  });

  const navigate = useNavigate();

  const saveTrainLine = (e) => {
    e.preventDefault();
    if (validateForm()) {
      TrainLineService.createTrainLine(newTrainLine)
        .then((response) => {
          console.log(response.data);
          navigate('/admin/Tuyến tàu');
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    if (!newTrainLine.soTuyenTau) {
        newErrors.soTuyenTau = 'Vui lòng nhập lại số tuyến tàu';
        valid = false;
      }
    
      if (!newTrainLine.tenTuyenTau) {
        newErrors.tenTuyenTau = 'Vui lòng nhập lại tên tuyến tàu';
        valid = false;
      }

      if (!newTrainLine.doDaiTuyenTau) {
        newErrors.doDaiTuyenTau = 'Vui lòng nhập lại độ dài tuyến tàu';
        valid = false;
      }
  
      if (!newTrainLine.thoiGianBatDau) {
        newErrors.thoiGianBatDau = 'Vui lòng nhập lại thời gian bắt đầu';
        valid = false;
      }
  
      if (!newTrainLine.thoiGianKetThuc) {
        newErrors.thoiGianKetThuc = 'Vui lòng nhập lại thời gian kết thúc';
        valid = false;
      }
  
      if (!newTrainLine.giaVe) {
        newErrors.giaVe = 'Vui lòng nhập lại giá vé';
        valid = false;
      }
  
      if (!newTrainLine.khuVuc) {
        newErrors.khuVuc = 'Vui lòng nhập lại khu vực';
        valid = false;
      }

      if (!newTrainLine.moTa) {
        newErrors.moTa = 'Vui lòng nhập lại mô tả';
        valid = false;
      }
      setErrors(newErrors);
      return valid;
    };


  const handleError = (error) => {
    alert('Thêm mới thất bại!');
    console.log(error);
  };

  return (
    <div>
      <br />
      <div className="container-addtrainline">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h2 className="text-center padding5">Thêm tuyến tàu</h2>
            <div className="card-body">
              <form method='POST'>

                <div className="form-group mb-2">
                  <label className="form-label">Số tuyến tàu: </label>
                  <input
                    type="text"
                    name="soTuyenTau"
                    value={newTrainLine.soTuyenTau}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, soTuyenTau: e.target.value });
                      setErrors({ ...errors, soTuyenTau: '' });
                    }}
                  />
                  {errors.soTuyenTau && <p style={{ color: 'red' }}>{errors.soTuyenTau}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Tên tuyến tàu: </label>
                  <input
                    type="text"
                    name="tenTuyenTau"
                    value={newTrainLine.tenTuyenTau}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, tenTuyenTau: e.target.value });
                      setErrors({ ...errors, tenTuyenTau: '' });
                    }}
                  />
                  {errors.soTuyenTau && <p style={{ color: 'red' }}>{errors.soTuyenTau}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Độ dài tuyến tàu: </label>
                  <input
                    type="number"
                    step="any"
                    name="doDaiTuyenTau"
                    value={newTrainLine.doDaiTuyenTau}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, doDaiTuyenTau: e.target.value });
                      setErrors({ ...errors, doDaiTuyenTau: '' });
                    }}
                  />
                  {errors.doDaiTuyenTau && <p style={{ color: 'red' }}>{errors.doDaiTuyenTau}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Thời gian bắt đầu: </label>
                  <input
                    type="text"
                    name="thoiGianBatDau"
                    value={newTrainLine.thoiGianBatDau}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, thoiGianBatDau: e.target.value });
                      setErrors({ ...errors, thoiGianBatDau: '' });
                    }}
                  />
                  {errors.thoiGianBatDau && <p style={{ color: 'red' }}>{errors.thoiGianBatDau}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Thời gian kết thúc: </label>
                  <input
                    type="text"
                    name="thoiGianKetThuc"
                    value={newTrainLine.thoiGianKetThuc}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, thoiGianKetThuc: e.target.value });
                      setErrors({ ...errors, thoiGianKetThuc: '' });
                    }}
                  />
                  {errors.thoiGianKetThuc && <p style={{ color: 'red' }}>{errors.thoiGianKetThuc}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Giá vé: </label>
                  <input
                    type="number"
                    name="giaVe"
                    value={newTrainLine.giaVe}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, giaVe: e.target.value });
                      setErrors({ ...errors, giaVe: '' });
                    }}
                  />
                  {errors.giaVe && <p style={{ color: 'red' }}>{errors.giaVe}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Khu vực: </label>
                  <input
                    type="text"
                    name="khuVuc"
                    value={newTrainLine.khuVuc}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, khuVuc: e.target.value });
                      setErrors({ ...errors, khuVuc: '' });
                    }}
                  />
                  {errors.khuVuc && <p style={{ color: 'red' }}>{errors.khuVuc}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Mô tả: </label>
                  <input
                    type="text"
                    name="moTa"
                    value={newTrainLine.moTa}
                    onChange={(e) => {
                      setNewTrainLine({ ...newTrainLine, moTa: e.target.value });
                      setErrors({ ...errors, moTa: '' });
                    }}
                  />
                  {errors.moTa && <p style={{ color: 'red' }}>{errors.moTa}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Trạng thái: </label>
                  <select
                    name="trangThai"
                    value={newTrainLine.trangThai}
                    onChange={(e) => setNewTrainLine({ ...newTrainLine, trangThai: e.target.value === 'true' })}
                  >
                    <option value="true">Đang hoạt động</option>
                    <option value="false">Dừng hoạt động</option>
                  </select>
                </div>

                <button className="btn margin2 btn-success float-right margin-2" onClick={saveTrainLine}>
                  Lưu
                </button>
                <Link style={{ textDecoration: 'none' }} to="/admin/Tuyến tàu" className="btn btn-danger float-right margin-2">
                  Hủy
                </Link>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrainLineComponent;