
import SignUpForm from './components/SignUpForm'
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={ <SignUpForm />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
