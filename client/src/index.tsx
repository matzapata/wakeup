import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { RestaurantListingScreen } from './screens/restaurant-listing';
import { OrderScreen } from './screens/order';
import { RestaurantScreen } from './screens/restaurant';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RestaurantListingScreen />,
  },
  {
    path: "/restaurants/:restaurantId",
    element: <RestaurantScreen />,
  },
  {
    path: "/restaurants/:restaurantId/order",
    element: <OrderScreen />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
