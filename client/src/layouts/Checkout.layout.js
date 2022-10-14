import React from "react";
// import Navbar from "../components/Navbar/CheckoutNavbar";

const CheckoutLayout =
  (Components) =>
  ({ ...props }) => {
    return (
      <>
        {/* {<Navbar />} */}
        <div className="container mx-auto px-4 lg:px-20 ">
          <Components {...props} />
        </div>
      </>
    );
  };

export default CheckoutLayout;
