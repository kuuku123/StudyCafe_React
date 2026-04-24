import React, { ButtonHTMLAttributes } from "react";
import { CSSProperties } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  width?: string | number;
  style?: CSSProperties;
  block?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  width,
  style,
  block,
  ...rest
}) => {
  let className = "Button";

  if (block) className += " block";
  const baseStyle: CSSProperties = {
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "#6366f1",
    color: "white",
    display: block ? "block" : "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: block ? "100%" : width || "auto",
    boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.2)",
  };

  const button_style = {
    small: {
      padding: "8px 16px",
      fontSize: "0.85rem",
    },
    medium: {
      padding: "12px 24px",
      fontSize: "1rem",
    },
    large: {
      padding: "16px 32px",
      fontSize: "1.1rem",
    },
  };

  const sizeStyle = button_style[size] || button_style.medium;
  const combinedStyle = { ...baseStyle, ...sizeStyle, ...style };

  return (
    <button
      {...rest}
      className={className}
      style={combinedStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#4f46e5";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(99, 102, 241, 0.3)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#6366f1";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(99, 102, 241, 0.2)";
      }}
    />
  );
};

export default Button;
