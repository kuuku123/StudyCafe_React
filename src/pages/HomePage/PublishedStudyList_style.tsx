import styled from "styled-components";

export const Page_Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;

interface CardProps {
  index?: number;
}

export const Card = styled.li<CardProps>`
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  border: 1px solid #f1f5f9;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    z-index: 2;
    border-color: #6366f1;
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
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

export const CardBody = styled.div`
  padding: 24px;
  text-align: left;

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1e293b;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
  }
`;

export const FullDescription = styled.div`
  margin-top: 12px;
  
  summary {
    cursor: pointer;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #6366f1;

    &:hover {
      text-decoration: underline;
    }
  }

  summary + div {
    display: none;
    padding-top: 8px;
    font-size: 0.85rem;
    color: #64748b;
  }
`;

interface PageButtonProps {
  active?: boolean;
}

export const PageButton = styled.button<PageButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  background: ${(props) => (props.active ? "#6366f1" : "white")};
  color: ${(props) => (props.active ? "white" : "#1e293b")};
  border: 1px solid ${(props) => (props.active ? "#6366f1" : "#e2e8f0")};
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;

  &:hover {
    border-color: #6366f1;
    color: ${(props) => (props.active ? "white" : "#6366f1")};
  }
`;

