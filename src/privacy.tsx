import React from 'react'
import ReactDOM from 'react-dom/client'
import PrivacyPolicy from './components/PrivacyPolicy.tsx'
import Footer from './components/Footer.tsx'
import './index.css'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivacyPolicy />
    <Footer />
  </React.StrictMode>,
)
