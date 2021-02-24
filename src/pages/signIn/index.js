import React, { useRef } from "react";
import './style.scss';
import  { Link } from 'react-router-dom';

import { api } from '../../service/api';
import { Form } from "@unform/web";
import Input from '../../components/Form/Input';
import { swalerror, swalsuccessredirect } from '../../util/dialog/index'


function SignIn() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {
      await api.post("/auth", { ...data })
        .then((response)=> {
          if(response.status === 200) {
            console.log("user", response.data.user.id)
            localStorage.setItem("id", response.data.user.id)
            swalsuccessredirect('Authenticate User is Success!',false, '/painel');
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }

  return <>
    <div className="container row">
      <div className="col-sm-12">
        <h1 className="text-center mt-4">Sign In</h1>
      </div>
      <div className="col-sm-12">
        
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <label htmlFor="card-email">E-mail</label>
            <Input name="email" className="form-control" type="email" />
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <label htmlFor="card-password">Password</label>
            </div>
            <Input name="password" className="form-control" type="password" />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block mt-3"
              type="submit">
                Sign In
            </button>
          </div>
        </Form>

        <div className="form-group">
          <Link to="/register" className="btn btn-primary btn-block mt-3"> Register </Link>
        </div>
      </div>
    </div>
  </>

}

export default SignIn;