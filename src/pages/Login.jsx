import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { login, setLoading, loading } = useAuthStore();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = isRegister ? 'register' : 'login';
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, { 
        email, 
        password 
      });
      
      console.log(res.data);
      
      login(res.data.token, res.data.user);
      
      navigate('/dashboard');
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <form
          className="bg-white rounded-lg p-8 space-y-6"
          onSubmit={onSubmit}
        >
          <h1 className="text-3xl font-light text-center text-gray-900">
            {isRegister ? 'Register' : 'Login'}
          </h1>
          
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm text-gray-600 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            
            <div>
              <label
                className="block text-sm text-gray-600 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                id="password"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : (isRegister ? 'Create Account' : 'Sign In')}
            </button>
            
            <button
              type="button"
              className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? 'Already have an account? Sign in'
                : "Don't have an account? Create one"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;