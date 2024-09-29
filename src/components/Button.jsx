import React from "react";

const Button = ({ size = "medium", width, style, block, ...rest }) => {
  let className = "Button";

  if (block) className += " block";
  const baseStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
    backgroundColor: "#f5f5f5",
    color: "#333",
    display: block ? "block" : "inline-block",
    width: block ? "100%" : width || "auto", 
  };
  const button_style = {
    small: {
      padding: "5px 10px",
      fontSize: "12px",
    },
    medium: {
      padding: "10px 20px",
      fontSize: "16px",
    },
    large: {
      padding: "15px 30px",
      fontSize: "20px",
    },
  };

  // Get size-specific styles from button_style based on the size prop
  const sizeStyle = button_style[size] || button_style.medium;
  const combinedStyle = { ...baseStyle, ...sizeStyle, ...style };

  return <button {...rest} className={className} style={combinedStyle} />;
};

export default Button;
