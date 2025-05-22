import logo from './logo.svg';
import './App.css';
import Login from './screens/Login';
import Signin from './screens/Signin';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './screens/Home';
import { getDataFromLocal } from './heplers/storeData/localStrorageData';
const userKey = process.env.REACT_APP_SET_AUTH_DATA;


const ProtectedRoute = ({ children }) => {
  const token = getDataFromLocal(userKey)?.token;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
