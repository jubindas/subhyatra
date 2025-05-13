import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/homee/Home.jsx";
import Hotel from "./hotels/Hotel.jsx";
import Flight from "./components/flights/Flight.jsx";
import Signupp from "./forUser/signup/Signupp.jsx";
import Loginn from "./forUser/login/Loginn.jsx";
import PublicRoute from "./routes/PublicRoute.jsx"; // 👈 Add this if not already
import Viewdeatils from "./hotels/rooms/view-details/Viewdeatils.jsx";
import Buss from "./bus/Buss.jsx";
import Bookings from "./hotels/rooms/bookings/Bookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // ✅ Public-only routes (login/signup) — only when NOT logged in
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Loginn /> },
          { path: "/signup", element: <Signupp /> },
        ],
      },

      // ✅ Always accessible (you can protect other routes separately if needed)
      { path: "/", element: <Home /> },
      { path: "/hotels", element: <Hotel /> },
      { path: "/bus", element: <Buss /> },
      { path: "/flights", element: <Flight /> },
      { path: "view-details/:roomId/:startDate/:endDate", element: <Viewdeatils /> },
      { path: "/bookings", element: <Bookings /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
