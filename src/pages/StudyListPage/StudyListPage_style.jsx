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
  transition: transform 0.4s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
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

export const FullDescription = styled.details`
  margin-top: 10px;
`;


