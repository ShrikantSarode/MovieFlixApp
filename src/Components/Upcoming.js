import axios from "axios";
import React from "react";

import { useEffect } from "react";

const Upcoming = () => {
  // https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1

  const Api_Key = "c45a857c193f6302f2b5061c3b85e743";

  const fetchUpcoming = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_Key}&language=en-US&page=1`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return <div>Upcoming</div>;
};

export default Upcoming;
