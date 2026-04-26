import styled from "styled-components";

export const DropDown_Header_style = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DropDown_style = styled.ul`
  position: absolute;
  z-index: 50;
  right: 0;
  top: calc(100% + 0.5rem);
  list-style: none;
  padding: 0.75rem;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 260px;
  transform-origin: top right;
  animation: dropdownFadeIn 0.2s ease-out;

  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  li {
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 2px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #f1f5f9;
    }
  }

  button, a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.625rem 0.75rem;
    text-align: left;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: #6366f1;
      background-color: #f1f5f9;
    }
  }

  /* Icons inside dropdown items */
  svg {
    color: #94a3b8;
    transition: color 0.2s ease;
  }

  li:hover svg {
    color: #6366f1;
  }
`;
