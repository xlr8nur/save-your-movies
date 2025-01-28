import React from "react";
import BouncingCirclesText from "./ui/circles";

const Header = () => {
  return (
    <div className="flex justify-center items-center w-1/5 h-24 mt-2 mb-10 ">
        <div className="flex justify-center items-center my-3">
          <BouncingCirclesText text="Your Movies!" />
        </div>
    </div>
  );
};

export default Header;