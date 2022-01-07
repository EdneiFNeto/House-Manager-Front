import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContainerTitle = styled.div`
  margin-top: 5%;
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
`;

export const SubTitle = styled.h3`
  color: #333;
  text-align: center;
  font-size: 26px;
  margin-bottom: 12px;
`;

export const ContainerForm = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 12px;
`;

export const MyForm = styled(Form)`
  padding: 5% 2%;
  width: 50%;
  height: auto;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.8);

`;

export const Input = styled.input`
  border: none;
  width: 100%;
  border-radius: 12px;
  padding: 8px;
  height: 60px;
  margin-bottom: 12px;
  border-bottom: 1 solid #333;
`;

export const Button = styled.button`
  border:none;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 12px;
  border-radius: 12px;
  color: white;
  width: 100%;
  height: 60px;
  font-weight: bold;
  font-size: 22px;
  text-transform: uppercase;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
  }
`;


export const MyLink = styled(Link)`
  font-weight: bold;
  color: #333;
  font-size: 18px;
  &:hover {
    color: #999;
    cursor: pointer;
  }
`;

export const ContaineLink = styled.div`
  flex: 1;
  align-content: center;
  text-align: center;
`;







