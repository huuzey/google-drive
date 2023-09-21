import React from "react";

const Button = ({ btnclass, title, onclick }: Button) => {
  return (
    <button onClick={onclick} className={` btn ${btnclass}`}>
      {title}
    </button>
  );
};

export default Button;
