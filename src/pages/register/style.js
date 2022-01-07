import styled from "styled-components";
import { Form } from "@unform/web";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContainerTitle = styled.div`
  margin-top: 10%;
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
`;

export const SubTitle = styled.h3`
  color: #333;
  text-align: center;
  margin-bottom: 12px;
`;

export const ContainerForm = styled.div`
  justify-content: center;
  display: flex;
`;

export const MyForm = styled(Form)`
  padding: 10% 2%;
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
  height: 40px;
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
  font-weight: bold;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    cursor: pointer;
  }
`;







