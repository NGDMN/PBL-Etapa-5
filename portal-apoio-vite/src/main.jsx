import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importações do Bootstrap (ordem é importante!)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Seus estilos personalizados (devem vir depois do Bootstrap)
import './styles/styles.css'

// Remove scripts duplicados que podem causar o erro 'Duplicate script ID'
const removeDuplicateScripts = () => {
  const scripts = document.querySelectorAll('script[id="fido2-page-script-registration"]');
  if (scripts.length > 1) {
    console.log(`Removendo ${scripts.length - 1} scripts duplicados`);
    for (let i = 1; i < scripts.length; i++) {
      scripts[i].remove();
    }
  }
};

// Remover scripts duplicados durante carregamento
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', removeDuplicateScripts);
  // Também adicionar um observador para mudanças no DOM
  const observer = new MutationObserver(removeDuplicateScripts);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
