import React, { useRef } from 'react';
import { Form } from "@unform/web";

import SideBar from '../sidebar';
import NavBar from '../navbar';
import Footer from '../footer';
import Input from '../../components/Form/Input';
import { api } from '../../service/api';
import { swalerror, swalsuccessredirect } from '../../util/dialog/index';
import avatar  from '../../assets/profile.png';

export default function User(){
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {
      await api.post("/auth", { ...data })
        .then((response)=> {
          if(response.status === 200) {
            swalsuccessredirect('Authenticate User is Success!',false, '/painel');
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
        <NavBar />
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-8">
                <div class="card">
                  <div class="card-header card-header-primary">
                    <h4 class="card-title">Edit Profile</h4>
                    <p class="card-category">Complete your profile</p>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={handleSubmit} ref={formRef}>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="bmd-label-floating">Name</label>
                            <Input name="name" type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="bmd-label-floating">E-mail</label>
                            <Input name="email" type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="bmd-label-floating">Password</label>
                            <Input type="password" class="form-control" name="password" />
                          </div>
                        </div>
                      </div>
                      
                      <button type="submit" class="btn btn-primary pull-right">Update Profile</button>
                      <div class="clearfix"></div>
                    </Form>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card card-profile">
                  <div class="card-avatar">
                    <a href="javascript:;">
                      <img class="img" src={avatar} />
                    </a>
                  </div>
                  <div class="card-body">
                    <h6 class="card-category text-gray">CEO / Co-Founder</h6>
                    <h4 class="card-title">Alec Thompson</h4>
                    <p class="card-description">
                      Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                    </p>
                    <a href="javascript:;" class="btn btn-primary btn-round">Follow</a>
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