import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Chart from './assets/Chart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="container">
      <App />
      <Chart />
    </div>
  </StrictMode>,
)
