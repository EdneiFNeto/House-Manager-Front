import React, { useEffect, useState } from 'react';
import './style.css';
import SideBar from '../sidebar';
import NavBar from '../navbar';
import Footer from '../footer';
import Card from '../../components/card';

export default function Painel () {
  const [countsUsers, setCountUsers] = useState([
    { id: 1, name: 'Ednei', light: 12.10, cedae: 30.90, total: 43.00, status: false },
    { id: 1, name: 'Ednei', light: 12.10, cedae: 30.90, total: 43.00, status: true },
    { id: 1, name: 'Ednei', light: 12.10, cedae: 30.90, total: 43.00, status: true }
  ]);

  const [totalCount, setTotalCounts] = useState(34.24);
  useEffect(()=> {}, [])

  function formaterNumber(number) {
    const num = Number(number).toFixed(2)
    return String(num).replace(".", ",")
  }

  return (
    <>
      <SideBar />
      <div className="main-panel">
        <NavBar />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <Card 
                  icon="content_copy"
                  color="warning"
                  category="Used Space"
                  cardTitle="49/50"
                  iconFooter="date_range"
                  titleFooter="Get More Space..."
                  />
              </div>
              
              <div className="col-lg-4 col-md-4 col-sm-4">
                <Card 
                  icon="store"
                  color="success"
                  category="Revenue"
                  cardTitle={`R$${formaterNumber(totalCount)}`}
                  iconFooter="date_range"
                  titleFooter="Last 24 Hours"
                  />
              </div>
              
              <div className="col-lg-4 col-md-4 col-sm-4">
                <Card 
                  icon="info_outline"
                  color="danger"
                  category="Fixed Issues"
                  cardTitle={`R$${formaterNumber(totalCount)}`}
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
              <div className="col-lg-6 col-md-12">
                <div className="card">

                  <div className="card-header card-header-tabs card-header-primary">
                    <div className="nav-tabs-navigation">
                      <div className="nav-tabs-wrapper">
                        <span className="nav-tabs-title">Tasks:</span>
                        <ul className="nav nav-tabs" data-tabs="tabs">
                          <li className="nav-item">
                            <a className="nav-link active" href="#profile" data-toggle="tab">
                              <i className="material-icons">bug_report</i> Bugs
                              <div className="ripple-container"></div>
                            </a>
                          </li>
                          
                          <li className="nav-item">
                            <a className="nav-link" href="#messages" data-toggle="tab">
                              <i className="material-icons">code</i> Website
                              <div className="ripple-container"></div>
                            </a>
                          </li>
                          
                          <li className="nav-item">
                            <a className="nav-link" href="#settings" data-toggle="tab">
                              <i className="material-icons">cloud</i> Server
                              <div className="ripple-container"></div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="tab-content">
                      
                      <div className="tab-pane active" id="profile">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" checked/>
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Sign contract for "What are conference organizers afraid of?"</td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" />
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                              </td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" checked />
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Create 4 Invisible User Experiences you Never Knew About</td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="tab-pane" id="messages">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" checked/>
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                              </td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" />
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Sign contract for "What are conference organizers afraid of?"</td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="tab-pane" id="settings">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" />
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" checked />
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                              </td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="" checked />
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </label>
                                </div>
                              </td>
                              <td>Sign contract for "What are conference organizers afraid of?"</td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">edit</i>
                                </button>
                                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="card">
                  <div className="card-header card-header-warning">
                    <h4 className="card-title">Stats Counts Users </h4>
                    <p className="card-category">New employees on 15th September, 2016</p>
                  </div>

                  <div className="card-body table-responsive">
                    
                    <table className="table table-hover">
                      <thead className="text-warning">
                        <th className="text-center">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Light</th>
                        <th className="text-center">Cedae</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Total</th>
                      </thead>
                      <tbody>
                        {
                          countsUsers.map((countUser, index) => (
                            <tr key={index}>
                              <td className="text-center">{countUser.id}</td>
                              <td className="text-center">{countUser.name}</td>
                              <td className="text-center">R${formaterNumber(countUser.light)}</td>
                              <td className="text-center">R${formaterNumber(countUser.cedae)}</td>
                              <td className="text-center"> 
                              <a role="button" className="btn btn-link btn-sm p-0" title={!countUser.status ? 'Pendente' : 'Pago'}>
                                <i  className={`material-icons ${countUser.status ? 'text-success' : 'text-danger'}`} >
                                  {countUser.status ? `check_circle`: `info`}
                                </i>
                              </a>
                              </td>
                              <td className="text-center">R${formaterNumber(countUser.total)}</td>
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