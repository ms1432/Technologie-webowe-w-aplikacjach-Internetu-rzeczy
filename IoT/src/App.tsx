
import SignUpForm from './components/SignUpForm'
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthCard from './components/AuthCard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<AuthCard />}>
            <Route index element={<SignUpForm />} />
            <Route path='/login' element={<LoginForm />} />
            </Route>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
