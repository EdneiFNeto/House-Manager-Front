import React, { useRef, useState, useEffect } from 'react';
import { Form } from "@unform/web";
import swal from 'sweetalert';

import SideBar from '../sidebar';
import Footer from '../footer';
import Select from '../../components/Form/select';
import { api } from '../../service/api';
import { dateActual } from '../../util/date/getMonthAndYearUtil'
import { swalerror, swalsuccess } from '../../util/dialog/index'

export default function TypesCounts(){
  const [nameTypeCounts, setNameAtpeCout] = useState([
    { value: 'Light', label: 'Light' },
    { value: 'Água', label: 'Cedae' },
    { value: 'Credit Card', label: 'Credit Card' }
  ]);
  
  const [typeCounts, setTypesCounts] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    getTypesCount();
  }, []);

  const getTypesCount = async() =>{
    await api.get(`/types-count`)
    .then((response) => {
      if(response.status === 200){
        setTypesCounts(response.data);
      }
    })
    .catch((error) => console.log('Error', error))
  } 

  const showDialogDeleteConfirm = (typeCount) => {
    swal({
      title: `Want to DELETE count the "${typeCount.name}"?`,
      text: "Is action not back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deleteCount(typeCount)
        
      } else {
        swal({
          title: "Cancel",
          text: "Is count did not DELETE!",
          icon: "warning"});
      }
    });
  }

  const deleteCount = async (typeCount) => {
    
    await api.delete(`/type-count/${typeCount.id}`)
      .then((response) => {
        if(response.status === 200){
          swalsuccess('DELETE is Success!', true);
          getTypesCount();
        }else{
          swalerror('Failed DELETE!', true);
        }
      })
      .catch((error) => console.log('Error', error));
  }

  async function handleSubmit(data, { reset }){
    try {
      await api.post("/types-count", data)
        .then((response)=> {
          if(response.status === 201) {
            reset()
            getTypesCount()
            swalsuccess('Register types count is Success',false);
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
        
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header card-header-primary">
                    <h4 class="card-title">Add accounts payments </h4>
                    <p class="card-category">Add accounts payments your profiles</p>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={handleSubmit} ref={formRef}>
                      <div class="row">
                        
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="bmd-label-floating">Types accounts to the payments</label>
                            <Select
                              name="name"
                              options={nameTypeCounts}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <button type="submit" class="btn btn-primary pull-right">Add Types accounts to the payments</button>
                      <div class="clearfix"></div>
                    </Form>
                  </div>
                </div>
              </div>
            
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header card-header-warning">
                    <h4 className="card-title">State types accounts to the payments </h4>
                    <p className="card-category">Last register on { dateActual }</p>
                  </div>

                  <div className="card-body table-responsive">
                    
                    <table className="table table-hover">
                      <thead className="text-warning">
                        <th className="text-left">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-right">Delete</th>
                      </thead>
                      <tbody>
                        {
                          typeCounts.map((count, index) => (
                            <tr key={index}>
                              <td className="text-left">{count.id}</td>
                              <td className="text-center">{count.name}</td>
                              <td className="text-right">
                                <button className="btn btn-link btn-sm p-0" onClick={()=>showDialogDeleteConfirm (count) }>
                                  <i className="material-icons">delete</i>
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>

                    </table>
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