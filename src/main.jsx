import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux';
import stores from './Redux/stores';
import { Toaster } from "sonner";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={stores}>
      <BrowserRouter> 
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
          },
        }}
      />
        <App/>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
