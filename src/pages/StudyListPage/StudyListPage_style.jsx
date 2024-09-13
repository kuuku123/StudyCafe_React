import styled from "styled-components";

export const Header_Input_style = styled.input`
  margin-left: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none; /* Remove the default focus outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
  height: auto;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const Card = styled.li`
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.1s;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: fit-content;
  position: relative;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }

  ${({ index }) => `
    &.card-${index}:hover summary + div {
      display: block;
      max-height: 1000px;
    }
  `}
`;

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardBody = styled.div`
  padding: 20px;
  text-align: center;

  h3 {
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
  }
`;

export const FullDescription = styled.div`
  summary {
    cursor: pointer;
    display: inline-block;
    font-size: 1em;
    font-weight: bold;
    animation: pulse 2s infinite; /* Animation for the periodic size change */

    /* Hover effect to change color slightly */
    &:hover {
      color: #555;
    }
  }

  /* Initially hide the full description content */
  summary + div {
    display: none;
  } 

  /* Define the keyframes for the pulse animation */
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1); /* Text gets slightly larger */
    }
    100% {
      transform: scale(1); /* Text returns to original size */
    }
  }
`;
