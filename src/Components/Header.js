import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/MovieFlixLogo.png";
import { getSearchQuery } from "../store/slices/searchSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const title = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(title.current.value);
    dispatch(getSearchQuery(title.current.value));
    navigation("/search");
    document.querySelector(".box1").value = "";
  };
  return (
    <>
      <div className="bg-dark">
        <nav class="navbar navbar-expand-lg container">
          <div class="container-fluid">
            <img src={logo} alt="" width={150} />

            <button
              className="navbar-toggler btn btn-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 menus">
                <li class="nav-item">
                  <Link class="nav-link nav" to="/">
                    Popular
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link nav" to="/top">
                    Top Rated
                  </Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link nav" to="/upcoming">
                    Upcoming
                  </Link>
                </li>
              </ul>
              <form class="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  class="form-control me-2 box1"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  ref={title}
                />
                <button class="btn btn-outline-danger" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
