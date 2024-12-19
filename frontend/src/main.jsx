// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
// import Error from './pages/Error.jsx'
// import Login from './pages/Login.jsx'
// import Dashboard from './pages/Dashboard.jsx'
// import Campaign from './pages/Campaign.jsx'
// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//   },

//   {
//     path: "/login",
//     element: <Login />,
//     errorElement: <Error />,
//   },

//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//     errorElement: <Error />,
//   },

//   {
//     path: "/campaign",
//     element: <Campaign />,
//     errorElement: <Error />,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  // <RouterProvider router={appRouter} />
  <App />

);
