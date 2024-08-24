import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider,   } from 'react-router-dom'
import LandingPage from './Components/LandingPage.jsx'
import Signup from './Components/Signup.jsx'
import SignIn from './Components/SignIn.jsx'
import Form from './Components/Form.jsx'
import { StyledEngineProvider } from '@mui/material'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route index  element={<LandingPage />} />
    <Route path='signup' element={<Signup />} />
    <Route path='signin' element={<SignIn />} />
    <Route path='form' element={<Form />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
    <RouterProvider router={router} />

    </StyledEngineProvider>
  </StrictMode>,
)
