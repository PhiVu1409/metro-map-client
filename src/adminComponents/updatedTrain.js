import React, { useState, useEffect } from 'react';
import TrainService from '../services/trainService';
import { useNavigate, Link, useParams } from 'react-router-dom';

function UpdateTrainComponent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedTrain, setUpdatedTrain] = useState({
    sTTGa: '',
    tenGa: '',
    thoiGian: '',
    diaChi: '',
    lat: '',
    lng: '',
    moTa: '',
    trangThai: '',
    idTrainLine: '',
  });

  const [errors, setErrors] = useState({
    sTTGa: '',
    tenGa: '',
    thoiGian: '',
    diaChi: '',
    lat: '',
    lng: '',
    moTa: '',
    trangThai: '',
  });

  const updateTrain = (e) => {
    e.preventDefault();
    if (validateForm()) {
      TrainService.updateTrain(id, updatedTrain)
        .then((response) => {
          console.log(response.data);
          navigate('/admin/Tàu/' + updatedTrain.idTrainLine);
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    if (!updatedTrain.sTTGa) {
      newErrors.sTTGa = 'Vui lòng nhập lại số thứ tự ga';
      valid = false;
    }

    if (!updatedTrain.tenGa) {
      newErrors.tenGa = 'Vui lòng nhập lại tên ga';
      valid = false;
    }

    if (!updatedTrain.thoiGian) {
      newErrors.thoiGian = 'Vui lòng nhập lại thời gian';
      valid = false;
    }

    if (!updatedTrain.diaChi) {
      newErrors.diaChi = 'Vui lòng nhập lại địa chỉ';
      valid = false;
    }

    if (!updatedTrain.lat) {
      newErrors.lat = 'Vui lòng nhập lại vĩ độ';
      valid = false;
    }

    if (!updatedTrain.lng) {
      newErrors.lng = 'Vui lòng nhập lại kinh độ';
      valid = false;
    }

    if (!updatedTrain.moTa) {
      newErrors.moTa = 'Vui lòng nhập lại mô tả';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    TrainService.getTrainById(id).then((response) => {
      console.log(response.data);
      setUpdatedTrain(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, [id]);

  const handleError = (error) => {
    alert('Cập nhật thất bại!');
    console.log(error);
  };

  return (
    <div>
      <br />
      <div className="container-addtrainline">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h2 className="text-center padding5">Cập nhật ga tàu</h2>
            <div className="card-body">
              <form method='PUT'>
                <div className="form-group mb-2">
                  <label className="form-label">Số thứ tự ga: </label>
                  <input
                    type="number"
                    name="soThuTuGa"
                    value={updatedTrain.sTTGa}
                    onChange={(e) => {
                      setUpdatedTrain({ ...updatedTrain, sTTGa: e.target.value });
                      setErrors({ ...errors, sTTGa: '' });
                    }}
                  />
                  {errors.sTTGa && <p style={{ color: 'red' }}>{errors.sTTGa}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Tên ga: </label>
                  <input
                    type="text"
                    name="tenGa"
                    value={updatedTrain.tenGa}
                    onChange={(e) => {
                      setUpdatedTrain({ ...updatedTrain, tenGa: e.target.value });
                      setErrors({ ...errors, tenGa: '' });
                    }}
                  />
                  {errors.tenGa && <p style={{ color: 'red' }}>{errors.tenGa}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Thời gian: </label>
                  <input
                    type="text"
                    name="thoiGian"
                    value={updatedTrain.thoiGian}
                    onChange={(e) => {
                      setUpdatedTrain({ ...updatedTrain, thoiGian: e.target.value });
                      setErrors({ ...errors, thoiGian: '' });
                    }}
                  />
                  {errors.thoiGian && <p style={{ color: 'red' }}>{errors.thoiGian}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Địa chỉ: </label>
                  <input
                    type="text"
                    name="diaChi"
                    value={updatedTrain.diaChi}
                    onChange={(e) => {
                      setUpdatedTrain({ ...updatedTrain, diaChi: e.target.value });
                      setErrors({ ...errors, diaChi: '' });
                    }}
                  />
                  {errors.diaChi && <p style={{ color: 'red' }}>{errors.diaChi}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Vĩ độ: </label>
                  <input
                    type="text"
                    name="viDo"
                    value={updatedTrain.lat}
                    onChange={(e) => {
                      setUpdatedTrain({ ...updatedTrain, lat: e.target.value });
                      setErrors({ ...errors, lat: '' });
                    }}
                  />
                  {errors.lat && <p style={{ color: 'red' }}>{errors.lat}</p>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Kinh độ: </label>
                  <input
                    type="text"
                    name="kinhDo"
                    value={updatedTrain.lng}
                    onChange={(e) => {
                      setUpdatedTrain({ ...updatedTrain, lng: e.target.value });
                      setErrors({ ...errors, lng: '' });
                    }}
                  />
                  {errors.lng && <p style={{ color: 'red' }}>{errors.lng}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Mô tả: </label>
                  <input
                    type="text"
                    name="moTa"
                    value={updatedTrain.moTa}
                    onChange={(e) => {
                      setUpdatedTrain({ ...updatedTrain, moTa: e.target.value });
                      setErrors({ ...errors, moTa: '' });
                    }}
                  />
                  {errors.moTa && <p style={{ color: 'red' }}>{errors.moTa}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Trạng thái: </label>
                  <select
                    name="trangThai"
                    value={updatedTrain.trangThai}
                    onChange={(e) => setUpdatedTrain({ ...updatedTrain, trangThai: e.target.value === 'true' })}
                  >
                    <option value="true">Đang hoạt động</option>
                    <option value="false">Dừng hoạt động</option>
                  </select>
                </div>

                <button
                  className="btn margin2 btn-success float-right margin-2"
                  onClick={updateTrain}
                >
                  Cập nhật
                </button>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={"/admin/Tàu/" + updatedTrain.idTrainLine}
                  className="btn btn-danger float-right margin-2"
                >
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

export default UpdateTrainComponent;
