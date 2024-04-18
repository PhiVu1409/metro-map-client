import React, { useState } from 'react';
import UserService from '../services/userService';
import { useNavigate, Link } from 'react-router-dom';


function CreateTrainComponent() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
  });


  const saveUser = (e) => {
    e.preventDefault();
    if (validateForm()) {
        UserService.createUser(newUser)
      .then((response) => {
        console.log(response.data);
        navigate('/admin/Admin');
      })
      .catch((error) => {
        handleError(error);
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    if (!newUser.fullName) {
        newErrors.fullName = 'Vui lòng nhập họ tên';
        valid = false;
      }
  
    if (!newUser.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
      valid = false;
    }

    if (!newUser.email) {
      newErrors.email = 'Vui lòng nhập email';
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
            <h2 className="text-center padding5">Thêm tài khoản</h2>
            <div className="card-body">
              <form method='POST'>

                <div className="form-group mb-2">
                  <label className="form-label">Họ tên: </label>
                  <input
                    type="text"
                    name="fullName"
                    value={newUser.fullName}
                    onChange={(e) => {
                      setNewUser({ ...newUser, fullName: e.target.value });
                      setErrors({ ...errors, fullName: '' });
                    }}
                  />
                  {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Email: </label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={(e) => {
                      setNewUser({ ...newUser, email: e.target.value });
                      setErrors({ ...errors, email: '' });
                    }}
                  />
                  {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Mật Khẩu: </label>
                  <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={(e) => {
                      setNewUser({ ...newUser, password: e.target.value });
                      setErrors({ ...errors, password: '' });
                    }}
                  />
                  {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                

                <button className="btn margin2 btn-success float-right margin-2" onClick={saveUser}>
                  Lưu
                </button>
                <Link style={{ textDecoration: 'none' }} to="/admin/Admin" className="btn btn-danger float-right margin-2">
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

export default CreateTrainComponent;