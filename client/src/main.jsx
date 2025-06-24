import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import MainRoutes from './routes/MainRoutes.jsx';

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>
)
