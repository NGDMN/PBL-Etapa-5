import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importações do Bootstrap (ordem é importante!)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Seus estilos personalizados (devem vir depois do Bootstrap)
import './styles/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
