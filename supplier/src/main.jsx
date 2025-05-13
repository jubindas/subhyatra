import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Screen from "./screens/frontpage/Screen.jsx";
import HotelForm from "./HotelsRooms/hotels/Hotelform.jsx"
import Signup from "./user/signup/Signup.jsx";
import Login from "./user/login/Login.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Roomform from "./HotelsRooms/rooms/Roomform.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      //  Public routes (only visible when NOT logged in)
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
      

    
      
      { path: "hotels", element: <Screen /> },
      
      

      //  Protected supplier routes
      {
        path: "hotels/addHotel",
        element: (
          <ProtectedRoute>
            <HotelForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "hotels/addRoom/:hotelId",
        element: (
          <ProtectedRoute>
           <Roomform></Roomform>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
