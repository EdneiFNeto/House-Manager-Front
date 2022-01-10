import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import './style.css';

import SideBar from '../sidebar';
import Footer from '../footer';
import Card from '../../components/card';
import { api } from '../../service/api';
import { getTotal } from '../../util/aritmetic/TotalUtil';
import { dateActual } from '../../util/date/getMonthAndYearUtil';
import { formaterNumber } from '../../util/formatter/FormatterNumerUtil';


export default function Painel () {
  const [accountToThePay, setAccountToThePay] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState();
  const [totalValue, setTotalValue] = useState();
  const [totalAccontPay, setTotalAccontPay] = useState();
  const [totalAccounts, setTotalAccount] = useState([]);

  useEffect(()=> {
    getCount()
  }, [])

  const getCount = async() =>{
    await api.get(`/account-user/${localStorage.getItem("id")}`)
    .then((response) => {
      if(response.status === 200){
        const arrayCount = response.data.filter((data) => { return data.status === false });
        const arrayCountPay = response.data.filter((data) => { return data.status === true });
        setTotalAccount(response.data.length);
        setTotalAccontPay(arrayCountPay.length);
        setAccountToThePay(arrayCount);
        setTotalDiscount(getTotalDiscount(arrayCount));
        setTotalValue(getTotalValue(arrayCount));
      }
    })
    .catch((error) => console.log('Error', error))
  } 

  const getTotalDiscount = (array) => array.reduce((total, count) => total + Number(count.discount), 0)
  const getTotalValue = (array) => array.reduce((total, count) => total + Number(count.value), 0)

  return (
    <>
      <SideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <Card 
                  icon="request_page"
                  color="warning"
                  category="Total account  paymented"
                  cardTitle={`${totalAccontPay !== undefined ? totalAccontPay : 0 }/
                    ${totalAccounts !== undefined ? totalAccounts : 0 }`}
                  iconFooter="date_range"
                  titleFooter="Get More Space..."
                  />
              </div>
              
              <div className="col-lg-4 col-md-4 col-sm-4">
                <Card 
                  icon="calculate"
                  color="success"
                  category="Total Value Account"
                  cardTitle={`R$${formaterNumber(totalValue)}`}
                  iconFooter="date_range"
                  titleFooter="Last 24 Hours"
                  />
              </div>
              
              <div className="col-lg-4 col-md-4 col-sm-4">
                <Card 
                  icon="price_change"
                  color="danger"
                  category="Total Discount Account"
                  cardTitle={`R$${formaterNumber(totalDiscount)}`}
                  iconFooter="date_range"
                  titleFooter="Last 24 Hours"
                  />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="card card-chart">
                  <div className="card-header card-header-success">
                    <div className="ct-chart" id="dailySalesChart"></div>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Daily Sales</h4>
                    <p className="card-category">
                      <span className="text-success"><i className="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">access_time</i> updated 4 minutes ago
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-chart">
                  <div className="card-header card-header-warning">
                    <div className="ct-chart" id="websiteViewsChart"></div>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Email Subscriptions</h4>
                    <p className="card-category">Last Campaign Performance</p>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">access_time</i> campaign sent 2 days ago
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-chart">
                  <div className="card-header card-header-danger">
                    <div className="ct-chart" id="completedTasksChart"></div>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Completed Tasks</h4>
                    <p className="card-category">Last Campaign Performance</p>
                  </div>
                  <div className="card-footer">
                    <div className="stats">
                      <i className="material-icons">access_time</i> campaign sent 2 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header card-header-warning">
                    <h4 className="card-title">State Account User </h4>
                    <p className="card-category">Last register on { dateActual } </p>
                  </div>

                  <div className="card-body table-responsive">

                      
                  <table className="table table-hover">
                      <thead className="text-warning">
                        <th className="text-center">Name</th>
                        <th className="text-center">Register Date(Expiration)</th>
                        <th className="text-center">Payment State</th>
                        <th className="text-center">Value (Real)</th>
                        <th className="text-center">Value (Discount)</th>
                      </thead>
                      <tbody>
                        {
                          accountToThePay.map((count, index) => (
                            <tr key={index}>
                              <td className="text-center">{count.type_account.name}</td>
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
                            </tr>
                          ))
                        }
                      </tbody>

                      <tbody>
                        <tr>
                          <td colSpan="4" className="text-left"><h4>Total</h4></td>
                          <td  className="text-center"><h4 className="p-0"><strong>{getTotal(accountToThePay)}</strong></h4></td>
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