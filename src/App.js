// import logo from './logo.svg';
import './App.css';
import RegisterCar from './Pages/RegisterCar';
import {BrowserRouter, Routes,Route} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/Header';
import Record from './Pages/Record';

function App() {
  return (
    <div className="App text-sm">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<RegisterCar />} />
          <Route path="/record" element={<Record />} />

            {/* <RegisterCar  /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
