import React from "react";
import "../styles/loader.css";
function Loader() {
  return (
    <div className="loader-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <p className="caption">Please wait!</p>
    </div>
  );
}

export default Loader;
