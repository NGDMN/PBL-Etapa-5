import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importações do Bootstrap (ordem é importante!)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Seus estilos personalizados (devem vir depois do Bootstrap)
import './styles/styles.css'

// Remover scripts duplicados que causam erros
const cleanupDuplicateScripts = () => {
  // Lista de IDs de scripts conhecidos que podem causar problemas de duplicação
  const scriptIdsToCheck = [
    'fido2-page-script-registration',
    'autofill-inline-menu-content'
  ];
  
  scriptIdsToCheck.forEach(scriptId => {
    const scripts = document.querySelectorAll(`script[id="${scriptId}"]`);
    if (scripts.length > 1) {
      console.log(`Removendo ${scripts.length - 1} scripts duplicados com ID: ${scriptId}`);
      for (let i = 1; i < scripts.length; i++) {
        scripts[i].parentNode.removeChild(scripts[i]);
      }
    }
  });
  
  // Remover também scripts sem ID mas com URLs ou conteúdos duplicados
  const allScripts = document.querySelectorAll('script');
  const scriptSrcs = {};
  
  [...allScripts].forEach(script => {
    const src = script.src;
    if (src && scriptSrcs[src]) {
      console.log(`Removendo script duplicado com src: ${src}`);
      script.parentNode.removeChild(script);
    } else if (src) {
      scriptSrcs[src] = true;
    }
  });
};

// Executar limpeza após carregamento do DOM e periodicamente
if (typeof window !== 'undefined') {
  // Primeira execução após carregamento do DOM
  document.addEventListener('DOMContentLoaded', cleanupDuplicateScripts);
  
  // Configurar execução periódica para pegar scripts adicionados dinamicamente
  setInterval(cleanupDuplicateScripts, 2000);
  
  // Observar mudanças no DOM para detectar novos scripts
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && 
          [...mutation.addedNodes].some(node => 
            node.nodeName === 'SCRIPT' || 
            (node.nodeType === 1 && node.querySelector('script'))
          )) {
        cleanupDuplicateScripts();
        break;
      }
    }
  });
  
  // Iniciar observação após a renderização inicial
  window.setTimeout(() => {
    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true 
    });
  }, 1000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
