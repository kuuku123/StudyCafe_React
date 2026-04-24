import styled from "styled-components";

export const Header_Input_style = styled.input`
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 18px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  padding: 40px 20px;

  h2 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 40px;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
`;

interface CardProps {
  index?: number;
}

export const Card = styled.li<CardProps>`
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #f1f5f9;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    z-index: 3;
    border-color: #6366f1;
  }

  ${({ index }) => `
    &.card-${index}:hover summary + div {
      display: block;
      max-height: 1000px;
      opacity: 1;
    }
  `}
`;

export const CardImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), transparent);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;

export const CardBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #64748b;
    line-height: 1.5;
  }
`;

export const RoleBadge = styled.span<{ roleType: "manager" | "member" }>`
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(props) => (props.roleType === "manager" ? "rgba(99, 102, 241, 0.1)" : "rgba(168, 85, 247, 0.1)")};
  color: ${(props) => (props.roleType === "manager" ? "#6366f1" : "#a855f7")};
  margin-bottom: 8px;
`;

export const FullDescription = styled.div`
  width: 100%;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;

  summary {
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    color: #94a3b8;
    transition: color 0.2s ease;
    list-style: none;

    &:hover {
      color: #6366f1;
    }

    &::after {
      content: " ↓";
      font-size: 0.8rem;
    }
  }

  summary + div {
    display: none;
    padding-top: 12px;
    font-size: 0.85rem;
    color: #64748b;
    text-align: left;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

