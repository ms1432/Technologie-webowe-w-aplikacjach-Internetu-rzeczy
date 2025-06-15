
import SignUpForm from './components/SignUpForm'
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import StarterForm from './components/StarterForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthCard from './components/AuthCard';
import AllDevicesChart from './components/AllDevicesChart';
import AdminPanel from './components/AdminPanel';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<AuthCard />}>
            <Route index element={<StarterForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<SignUpForm />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alldeviceschart" element={<AllDevicesChart />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
