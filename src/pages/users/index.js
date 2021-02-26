import React, { useRef, useEffect, useState } from 'react';
import { Form } from "@unform/web";

import SideBar from '../sidebar';
import NavBar from '../navbar';
import Footer from '../footer';
import Input from '../../components/Form/Input';
import { api } from '../../service/api';
import { swalerror, swalsuccess } from '../../util/dialog/index';
import avatar  from '../../assets/profile.png';

export default function User(){
  const formRef = useRef(null);
  const [users, setUsers] = useState(undefined);

  useEffect(()=> {
    getUser()
  }, [])

  async function getUser(){
    await api.get(`/users/${localStorage.getItem("id")}`)
      .then((response)=> {
        if(response.status === 200){
          setUsers(response.data)
          formRef.current.setData(response.data)
        }
      })
      .catch((error) => console.log('error', error))
  }

  async function handleSubmit(data){
    try {
      const id = users.id
      await api.put(`/users/${id}`, { ...data })
        .then((response)=> {
          if(response.status === 204) {
            swalsuccess('Update User is Success!', false);
            getUser();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }
  return(
    <>
      <SideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Edit Profile</h4>
                    <p className="card-category">Complete your profile</p>
                  </div>
                  <div className="card-body">
                    <Form onSubmit={handleSubmit} ref={formRef}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">Name</label>
                            <Input name="name" type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">E-mail</label>
                            <Input name="email" type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">Password</label>
                            <Input type="password" className="form-control" name="password" />
                          </div>
                        </div>
                      </div>
                      
                      <button type="submit" className="btn btn-primary pull-right">Update Profile</button>
                      <div className="clearfix"></div>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-profile">
                  <div className="card-avatar">
                    <a href="javascript:;">
                      <img className="img" src={avatar} />
                    </a>
                  </div>
                  <div className="card-body">
                    {
                      users !== undefined  && (
                        <div>
                          <h4 className="card-title">{users.name}</h4>
                          <p className="card-description">{users.email}</p>
                          <a href="javascript:;" className="btn btn-primary btn-round">Follow</a>
                        </div>
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}