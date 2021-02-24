import React, { useRef } from "react";

import './style.scss';
import { api } from '../../service/api';

import { Form } from "@unform/web";
import Input from '../../components/Form/Input';
import { swalerror, swalsuccess } from '../../util/dialog/index'

function Register() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {
      await api.post("/users", { ...data })
        .then((response)=> {
          if(response.status === 201) {
            swalsuccess("Success register user!", true)
            reset();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }

  return <>
    <div className="container row">
      <h1 className="col-sm-12 text-center">Register</h1>
      <div className="col-sm-12">
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <label htmlFor="card-email">User</label>
            <Input name="name" className="form-control" type="text" />
          </div>
          
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <label htmlFor="card-password">E-mail</label>
            </div>
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
                Register
            </button>
          </div>
        </Form>
      </div>
    </div>

  </>
}

export default Register;