
import SignUpForm from './components/AuthForms/SignUpForm'
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import LoginForm from './components/AuthForms/LoginForm';
import StarterForm from './components/AuthForms/StarterForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthCard from './components/AuthForms/AuthCard';
import AllDevicesChart from './components/AllDevicesData/AllDevicesChart';
import AdminPanel from './components/AdminPanel/AdminPanel';

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
