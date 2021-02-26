import React, { useRef } from "react";
import './style.scss';
import  { Link } from 'react-router-dom';

import { api } from '../../service/api';
import { Form } from "@unform/web";
import Input from '../../components/Form/Input';
import { swalerror, swalsuccessredirect } from '../../util/dialog/index';

function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {
      await api.post("/auth", { ...data })
        .then((response)=> {
          if(response.status === 200) {
            console.log(response.data)
            console.log('token', response.data.token);

            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("token", response.data.token);
            swalsuccessredirect('Authenticate User is Success!',false, '/painel');
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }

  return <>
    <div className="page">
      <div className="main">
        <div className="main-wrapper">
          <div className="login-methods">
            <div className="login-methods-signup text-gold btn-gray ">
              <Link to="/register" className="btn btn-link "> Register </Link>
            </div>
          </div>
          
          <Form onSubmit={handleSubmit} ref={formRef}>


            <div className="form-body">
                <Input name="email" className="input" type="email" 
                  placeholder="E-mail" />
                <Input name="password" className="input" type="password"
                  placeholder="Password" />
              <button type="submit">Sign In</button>
            </div>

            <div className="form-message">
              <div className="form-message-title">
                <h1>welcome</h1>
              </div>
              <div className="form-message-body">
                <h3>Hello, wellcome in the House Manager</h3>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </>
}

export default SignIn;