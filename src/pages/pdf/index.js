import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { dateActual } from '../../util/date/getMonthAndYearUtil'
import { getTotal } from '../../util/aritmetic/TotalUtil';

export default function PDF(props){
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    const arrayCounts = []
    props.location.state.counts.forEach(count => {
      if(count.status === false) {
        arrayCounts.push(count)
      }
    });
    setCounts(arrayCounts);
  }, [props]);

  return (
            
    <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div className="col-sm-12">
          <h2 className="text-center pt-4">{props.location.state.counts[0].user.name}</h2>
          <h3 className="text-center">{ dateActual }</h3>
        </div>

        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header card-header-warning">
              <h4 className="card-title">State Account User</h4>
              <p className="card-category">Last register on { dateActual }</p>
            </div>

            <div className="card-body table-responsive">
              
              <table className="table table-hover">
                <thead className="text-warning">
                  <th className="text-left">ID</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Register Date(Expiration)</th>
                  <th className="text-center">Value (Real)</th>
                  <th className="text-center">Value (Discount)</th>
                  <th className="text-center">Payment Sate</th>
                </thead>
                <tbody>
                  {
                    counts.map((count, index) => (
                      
                      <tr key={index}>
                        <td className="text-left">{count.id}</td>
                        <td className="text-center">{count.typeCount.name}</td>
                        <td className="text-center">{format(new Date(parseISO(count.register_date)), "dd/MM/yyyy")}</td>
                        <td className="text-center">R${count.value}</td>
                        <td className="text-center">R${count.discount}</td>
                        <td className="text-center">
                        <a role="button" className="btn btn-link btn-sm p-0" title={!count.status ? 'Pendente' : 'Pago'}>
                                <i  className={`material-icons ${count.status ? 'text-success' : 'text-danger'}`} >
                                  {count.status ? `check_circle`: `info`}
                                </i>
                              </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>

                <tbody>
                  <tr>
                    <td colSpan="5" className="text-left"><h4>Total</h4></td>
                    <td  className="text-center"><h4 className="p-0"><strong>{getTotal(counts)}</strong></h4></td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}


