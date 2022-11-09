import React, { useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useDispatch } from "react-redux"
import { getCart } from "../redux/reducers/cart/cart.action";

// Layout
// import RestaurantLayout from "../layouts/Restaurant.layout";
const Restaurant = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCart());
  } , []);

  if (`/restaurant/${id}` === pathname) {
    return <Navigate to={`/restaurant/${id}/overview`} />;
  }
  return (
    <>
      {/* <h2>Restaurant</h2> */}
      <Outlet />
    </>
  );
};

// export default RestaurantLayout(Restaurant);
export default Restaurant;
