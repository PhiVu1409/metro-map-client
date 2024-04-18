import React, { useState, useEffect } from 'react';
import TrainService from '../services/trainService';
import TrainLineService from '../services/trainLineService';
import { useNavigate, Link, useParams } from 'react-router-dom';

function CreateUserComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newTrain, setNewTrain] = useState({
    sTTGa: '',
    tenGa: '',
    thoiGian: '',
    diaChi: '',
    lat: '',
    lng: '',
    moTa: '',
    trangThai: '',
    idTrainLine: id,
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

  const [trainLine, setTrainLine] = useState({
    nameTrainLine: '',
  });

  const saveTrain = (e) => {
    e.preventDefault();
    if (validateForm()) {
      TrainService.createTrain(newTrain)
      .then((response) => {
        console.log(response.data);
        navigate('/admin/Tàu/'+newTrain.idTrainLine);
      })
      .catch((error) => {
        handleError(error);
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    if (!newTrain.sTTGa) {
        newErrors.sTTGa = 'Vui lòng nhập lại số thứ tự ga';
        valid = false;
      }
  
      if (!newTrain.tenGa) {
        newErrors.tenGa = 'Vui lòng nhập lại tên ga';
        valid = false;
      }
  
      if (!newTrain.thoiGian) {
        newErrors.thoiGian = 'Vui lòng nhập lại thời gian';
        valid = false;
      }
  
      if (!newTrain.diaChi) {
        newErrors.diaChi = 'Vui lòng nhập lại địa chỉ';
        valid = false;
      }
  
      if (!newTrain.lat) {
        newErrors.lat = 'Vui lòng nhập lại vĩ độ';
        valid = false;
      }
  
      if (!newTrain.lng) {
        newErrors.lng = 'Vui lòng nhập lại kinh độ';
        valid = false;
      }
  
      if (!newTrain.moTa) {
        newErrors.moTa = 'Vui lòng nhập lại mô tả';
        valid = false;
      }
    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    TrainLineService.getTrainLineById(id).then((response) => {
      setTrainLine({ ...trainLine, nameTrainLine: response.data.soTuyenTau })
    }).catch(error =>{
      console.log(error)
    })
  },[id, trainLine])

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
            <h2 className="text-center padding5">Thêm ga thuộc tuyến {trainLine.nameTrainLine}</h2>
            <div className="card-body">
              <form method='POST'>
                <div className="form-group mb-2">
                  <label className="form-label">Số thứ tự ga: </label>
                  <input
                    type="number"
                    name="soThuTuGa"
                    value={newTrain.sTTGa}
                    onChange={(e) => {
                      setNewTrain({ ...newTrain, sTTGa: e.target.value });
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
                    value={newTrain.tenGa}
                    onChange={(e) => {
                      setNewTrain({ ...newTrain, tenGa: e.target.value });
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
                    value={newTrain.thoiGian}
                    onChange={(e) => {
                      setNewTrain({ ...newTrain, thoiGian: e.target.value });
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
                    value={newTrain.diaChi}
                    onChange={(e) => {
                      setNewTrain({ ...newTrain, diaChi: e.target.value });
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
                    value={newTrain.lat}
                    onChange={(e) => {
                      setNewTrain({ ...newTrain, lat: e.target.value });
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
                    value={newTrain.lng}
                    onChange={(e) => {
                      setNewTrain({ ...newTrain, lng: e.target.value });
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
                    value={newTrain.moTa}
                    onChange={(e) => {
                      setNewTrain({ ...newTrain, moTa: e.target.value });
                      setErrors({ ...errors, moTa: '' });
                    }}
                  />
                  {errors.moTa && <p style={{ color: 'red' }}>{errors.moTa}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Trạng thái: </label>
                  <select
                    name="trangThai"
                    value={newTrain.trangThai}
                    onChange={(e) => setNewTrain({ ...newTrain, trangThai: e.target.value === 'true' })}
                  >
                    <option value="true">Đang hoạt động</option>
                    <option value="false">Dừng hoạt động</option>
                  </select>
                </div>
                <button className="btn margin2 btn-success float-right margin-2" onClick={saveTrain}>
                  Lưu
                </button>
                <Link style={{ textDecoration: 'none' }} to={"/admin/Tàu/"+id} className="btn btn-danger float-right margin-2">
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

export default CreateUserComponent;