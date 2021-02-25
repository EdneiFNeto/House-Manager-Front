import React, { useRef, useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Form } from "@unform/web";
import swal from 'sweetalert';
import  { Link } from 'react-router-dom';

import SideBar from '../sidebar';
import Footer from '../footer';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/select';
import { api } from '../../service/api';
import { dateActual } from '../../util/date/getMonthAndYearUtil'

import { swalerror, swalsuccess } from '../../util/dialog/index'

export default function Count(){
  const [typeCounts, setTypeCounts] = useState([]);

  const [discounts, setDiscounts] = useState([
    { value: 0.05, label: '5%'},
    { value: 0.10, label: '10%'},
    { value: 0.15, label: '15%'},
    { value: 0.20, label: '20%'},
    { value: 0.25, label: '25%'},
    { value: 0.30, label: '30%'},
    { value: 0.35, label: '35%'},
    { value: 0.40, label: '40%'},
    { value: 0.45, label: '45%'},
    { value: 0.50, label: '50%'},
    { value: 0.55, label: '55%'},
    { value: 0.60, label: '60%'},
    { value: 0.65, label: '65%'},
    { value: 0.70, label: '70%'},
    { value: 0.75, label: '75%'},
    { value: 0.80, label: '80%'},
    { value: 0.85, label: '85%'},
    { value: 0.90, label: '90%'},
    { value: 0.95, label: '95%'},
    { value: 100.0, label: '100%'},
  ]);
  
  const [counts, setCounts] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    getCount();
    getTypesCount();
  }, []);

  const getCount = async() =>{
    await api.get(`counts/user/${localStorage.getItem("id")}`)
    .then((response) => {
      if(response.status === 200){
        setCounts(response.data);
      }
    })
    .catch((error) => console.log('Error', error))
  } 

  const getTypesCount = async() =>{
    await api.get(`/types-count`)
    .then((response) => {
      if(response.status === 200){
        const arrayTypeCounts = [];
        response.data.forEach(data => {
          arrayTypeCounts.push({value: data.id, label: data.name})
        });
        setTypeCounts(arrayTypeCounts);
      }
    })
    .catch((error) => console.log('Error', error))
  } 

  const showDialogConfirm = (count) => {
    swal({
      title: `Want to pay count the "${count.typeCount.name}"?`,
      text: "Is action not back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        updateCount(count)
        
      } else {
        swal({
          title: "Cancel",
          text: "Is count did not payment!",
          icon: "warning"});
      }
    });
  }

  const showDialogDeleteConfirm = (count) => {
    swal({
      title: `Want to DELETE count the "${count.typeCount.name}"?`,
      text: "Is action not back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deleteCount(count)
        
      } else {
        swal({
          title: "Cancel",
          text: "Is count did not DELETE!",
          icon: "warning"});
      }
    });
  }

  const updateCount = async (count) => {
    const data ={
      status: true
    }

    await api.put(`/counts/${count.id}`, data)
      .then((response) => {
        console.log("ID", count.id)
        if(response.status === 204){
          swalsuccess('Payment is Success!', true);
          getCount();
        }else{
          swalerror('Failed Pay count!', true);
        }
      })
      .catch((error) => console.log('Error', error));
  }

  const deleteCount = async (count) => {
    
    await api.delete(`/counts/${count.id}`)
      .then((response) => {
        console.log("ID", count.id)
        if(response.status === 200){
          swalsuccess('DELETE is Success!', true);
          getCount();
        }else{
          swalerror('Failed DELETE count!', true);
        }
      })
      .catch((error) => console.log('Error', error));
  }

  async function handleSubmit(data, { reset }){
    try {
      const dataRequest = {
        ...data,
        user_id: localStorage.getItem('id')
      }
      await api.post("/counts", dataRequest)
        .then((response)=> {
          if(response.status === 201) {
            reset()
            getCount()
            swalsuccess('Register count is Success',false);
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }

  const getTotalCount = () => {
    let total = 0
    if(counts.length > 0){
      total = counts.reduce((total, count) => total + Number(count.discount), 0)
    }
    return `R$${Number(total).toFixed(2)}`;
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
                    <h4 class="card-title">Add Account Pay</h4>
                    <p class="card-category">Add account pay your profile</p>
                  </div>
                  <div class="card-body">
                    <Form onSubmit={handleSubmit} ref={formRef}>
                      <div class="row">
                        
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="bmd-label-floating">Account to the paymented</label>
                            <Select
                              name="type_id"
                              options={typeCounts}
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="bmd-label-floating">Value($R</label>
                            <Input name="value" type="text" class="form-control" />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="bmd-label-floating">Discount(R$)</label>
                            <Select
                              name="discount"
                              options={discounts}
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="bmd-label-floating">Date</label>
                            <Input name="register_date" type="date" class="form-control" />
                          </div>
                        </div>
                      </div>
                      
                      <button type="submit" class="btn btn-primary pull-right">Add Account to the Pay</button>
                      <div class="clearfix"></div>
                    </Form>
                  </div>
                </div>
              </div>
            
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header card-header-warning">
                    <h4 className="card-title">State Account User </h4>
                    <p className="card-category">Last register on { dateActual } </p>
                  </div>

                  <div className="card-body table-responsive">
                    
                    <table className="table table-hover">
                      <thead className="text-warning">
                        <th className="text-left">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Register Date</th>
                        <th className="text-center">Payment State</th>
                        <th className="text-center">Value (Real)</th>
                        <th className="text-center">Value (Discount)</th>
                        <th className="text-center">Pay</th>
                        <th className="text-center">Delete</th>
                      </thead>
                      <tbody>
                        {
                          counts.map((count, index) => (
                            <tr key={index}>
                              <td className="text-left">{count.id}</td>
                              <td className="text-center">{count.typeCount.name}</td>
                              <td className="text-center">{format(new Date(parseISO(count.register_date)), "dd/MM/yyyy")}</td>
                              <td className="text-center"> 
                              <a role="button" className="btn btn-link btn-sm p-0" title={!count.status ? 'Pendente' : 'Pago'}>
                                <i  className={`material-icons ${count.status ? 'text-success' : 'text-danger'}`} >
                                  {count.status ? `check_circle`: `info`}
                                </i>
                              </a>
                              </td>
                              <td className="text-center">R${count.value}</td>
                              <td className="text-center">R${count.discount}</td>
                              <td className="text-center">
                                <button className="btn btn-link btn-sm p-0" onClick={()=> showDialogConfirm (count) }>
                                  <i className="material-icons">payment</i>
                                </button>
                              </td>

                              <td className="text-center">
                                <button className="btn btn-link btn-sm p-0" onClick={()=>showDialogDeleteConfirm (count) }>
                                  <i className="material-icons">delete</i>
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>

                      <tbody>
                        <tr>
                          <td colSpan="7" className="text-left"><h4>Total</h4></td>
                          <td  className="text-center"><h4 className="p-0"><strong>{getTotalCount()}</strong></h4></td>
                        </tr>
                      </tbody>

                      <tbody>
                        <tr>
                          <td colSpan="8" className="text-right">
                            <Link className="btn btn-link btn-sm p-0" to={{ pathname: "/pdf", state: { counts }} }>
                              <h5>
                                <i className="material-icons  md-18 ">picture_as_pdf</i> Create PDF
                              </h5>
                            </Link>
                          </td>
                        </tr>
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