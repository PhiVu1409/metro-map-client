import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './components/appBar';
import BodyLeft from './components/bodyLeft';
import BodyRight from './components/bodyRight';
import AdminAppBar from './adminComponents/adminAppBar';
import ListTrainLinesComponent from './adminComponents/trainLineList';
import CreateTrainLineComponent from './adminComponents/createTrainLine';
import TrainLineDetail from './adminComponents/trainLineDetail';
import UpdateTrainLineComponent from './adminComponents/updatedTrainLine';
import ListTrainComponent from './adminComponents/trainList';
import TrainDetail from './adminComponents/trainDetail';
import CreateTrainComponent from './adminComponents/createTrain';
import UpdateTrainComponent from './adminComponents/updatedTrain';
import BodyLeftInfoTrain from './components/bodyLeftInfoTrain';
import BodyRightInfoTrain from './components/bodyRightInfoTrain';
import BodyLeftInfoDetailTrain from './components/bodyLeftInfoDetailTrain';
import BodyRightInfoDetailTrain from './components/bodyRightInfoDetailTrain';
import Login from './adminComponents/login';
import ListAdminComponent from './adminComponents/adminList';
import CreateUserComponent from './adminComponents/createAdmin';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Body.css';
import './App.css';

function App() {
  const isAuthenticated = () => {
      return !!localStorage.getItem('accessToken');
  };

  

  return (
    <Router>
      <div className='metro-map'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*"
            element={
              isAuthenticated() ? <AdminRoutes /> : <Navigate to="/login" />
            } />
          <Route path="*" element={<UserContent />} />
        </Routes>
      </div>
    </Router>
  );
}

function AdminRoutes() {
  return (
    <>
      <AdminAppBar />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/Tuyến tàu" element={<ListTrainLinesComponent />} />
        <Route path="/detailtrainline/:id" element={<TrainLineDetail />} />
        <Route path="/addtrainline" element={<CreateTrainLineComponent />} />
        <Route path="/edittrainline/:id" element = {<UpdateTrainLineComponent/>}/>
        <Route path="/Tàu/:id" element={<ListTrainComponent />} />
        <Route path="/detailtrain/:id" element={<TrainDetail />} />
        <Route path="/addtrainbyidtrainline/:id" element={<CreateTrainComponent />} />
        <Route path="/edittrain/:id" element = {<UpdateTrainComponent/>}/>
        <Route path="/Admin" element={<ListAdminComponent />} />
        <Route path="/createadmin" element={<CreateUserComponent />} />
      </Routes>
    </>
  );
}

function AdminDashboard() {
  return (
    <h1>Welcome to Admin Dashboard</h1>
  );
}

function CommonContent() {
  return (
    <>
      <BodyLeft />
      <BodyRight />
    </>
  );
}
function InfoTrainContent() {
  return (
    <>
      <BodyLeftInfoTrain />
      <BodyRightInfoTrain />
    </>
  );
}

function InfoDetailTrainContent() {
  return (
    <>
      <BodyLeftInfoDetailTrain />
      <BodyRightInfoDetailTrain />
    </>
  );
}

function UserContent() {
  return (
    <>
      <ResponsiveAppBar />
      <div className='body'>
        <div className='container-user'>
          <Routes>
            <Route path="*" element={<CommonContent />} />
            <Route path="/listtrain/:id" element={<InfoTrainContent />} />
            <Route path="/detailtrain/:id" element={<InfoDetailTrainContent />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
