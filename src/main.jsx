import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Page pré-rendue : on "hydrate" le HTML existant ; en dev, rendu classique
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
