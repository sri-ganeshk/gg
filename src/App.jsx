import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Course from './pages/Course';
import Upload from './pages/Upload';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course" element={<Course />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/course/:id" element={<Course  />} />
        {/* <Route path="/course/:id/qna" element={<Qna />} />
        <Route path="/course/:id/flashCards" element={<FlashCards />} /> */}
      </Routes>
    </>
  );
}

export default App;
