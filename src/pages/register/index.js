import React, { useRef } from "react";
import { api } from '../../service/api';
import { 
  Container, 
  ContainerTitle,
  Title, 
  SubTitle, 
  ContainerForm,
  MyForm,
  Input, 
  Button,
} from './style';
import { swalerror, swalsuccessredirect } from '../../util/dialog/index'

function Register() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {
      await api.post("/users", { ...data })
        .then((response)=> {
          if(response.status === 201) {
            swalsuccessredirect("Success register user", true, '/')
            reset();
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
          <Input name="name" className="input" type="text" placeholder="Name Profile" />
          <Input name="email" className="input" type="email" placeholder="E-mail" />
          <Input name="password" className="input" type="password" placeholder="Password" />
          <Button type="submit">Register</Button>
        </MyForm>
      </ContainerForm>
    </Container>
  </>
}

export default Register;