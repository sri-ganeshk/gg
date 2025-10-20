import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Course from './pages/Course';
import Upload from './pages/Upload';

function App() {
  return (
    <div className="min-h-screen bg-cream-200">
      <Navbar />
      <main className="pb-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course" element={<Course />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/course/:id" element={<Course  />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
