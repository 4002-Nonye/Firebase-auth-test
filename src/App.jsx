import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Gallery from './pages/Gallery/Gallery';
import Login from './pages/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home/Home';
import { ImagesProvider } from './contexts/ImagesContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ImagesProvider>
          {' '}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ImagesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
