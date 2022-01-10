import React, { useRef } from "react";
import { api } from '../../service/api';

import { swalerror, swalsuccessredirect } from '../../util/dialog/index';
import { 
  Container, 
  Title, 
  SubTitle, 
  MyInput, 
  Button,
  MyLink, 
  ContaineLink, 
  MyForm,
  ContainerForm,
  ContainerTitle,
} from './style';

function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit(data){
    try {
      await api.post("/login", { ...data })
        .then((response)=> {
          if(response.status === 200) {
            console.log(response.data);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            swalsuccessredirect('Authenticate User is Success!',false, '/painel');
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }

  return <>
    <Container>

      <ContainerTitle>
        <Title>welcome</Title>
        <SubTitle>Hello, wellcome in the House Manager</SubTitle>
      </ContainerTitle>
      
      <ContainerForm>
        <MyForm onSubmit={handleSubmit} ref={formRef}>
          <MyInput name="email" className="input" type="email" placeholder="E-mail" />
          <MyInput name="password" className="input" type="password" placeholder="Password" />
          <Button type="submit">Sign In</Button>
        </MyForm>
      </ContainerForm>

      <ContaineLink>
        <MyLink to="/register"> Ainda não tenho conta </MyLink>
      </ContaineLink> 
    </Container>
  </>
}

export default SignIn;