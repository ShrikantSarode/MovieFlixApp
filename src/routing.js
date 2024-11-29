import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./Components/App";
import Popular from "./Components/Popular";
import Toprated from "./Components/Toprated";
import Upcoming from "./Components/Upcoming";
import Search from "./Components/Search";
import MovieDetails from "./Components/MovieDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Popular />,
      },
      {
        path: "/top",
        element: <Toprated />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/movie",
        element: <MovieDetails />,
      },
    ],
  },
]);
export default router;
