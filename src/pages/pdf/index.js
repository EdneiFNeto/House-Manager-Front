import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

import { dateActual } from '../../util/date/getMonthAndYearUtil'
import { getTotal } from '../../util/aritmetic/TotalUtil';

export default function PDF(props){
  const [counts, setCounts] = useState([]);
  const [diference, setDiference] = useState();
  const [obs, setObs] = useState();
  const [cedae, setCedae] = useState();
  const [valueCedae, setValueCedae] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const arrayCounts = []
    props.location.state.accountsSelected.forEach(count => {
      arrayCounts.push(count)
    });

    arrayCounts.sort();
    setCounts(arrayCounts);
  }, [props]);

  useEffect(()=> {
    getValueReal();
  }, [counts])

  const getValueReal = () => {
      if(counts.length > 0){

        const user = counts.map((c)=> {return c.user.name} )[0]
        const cedae = counts.filter((c)=> c.type_account.name === 'Água'  )[0]
        const light = counts.filter((c)=> c.type_account.name === 'Light'  )[0]
        
        setUser(user)
        
        if(cedae !== undefined && light !== undefined ){
          
          setCedae(cedae.type_account.name)
          setValueCedae(cedae.value)
          
          const calc = cedae.value - getTotal(counts)
          const text = `(${cedae.type_account.name}) R$${cedae.value} - (Total) R$${getTotal(counts)} = R$${Number(calc).toFixed(2)}`
          
          setObs(text)
          setDiference(Number(calc).toFixed(2))
        }
    }
  }


  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="text-center pt-4">{ user }</h2>
            <h3 className="text-center">{ dateActual }</h3>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="card-header card-header-warning">
                <h4 className="card-title">Account State  to the paymented User</h4>
                <p className="card-category">Last register on { dateActual }</p>
              </div>

              <div className="card-body table-responsive">
                
                <table className="table table-hover">
                  <thead className="text-warning">
                    <th className="text-left">ID</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Register Date(Expiration)</th>
                    <th className="text-center">Payment Sate</th>
                    <th className="text-center">Value (Real)</th>
                    <th className="text-center">Value (Discount)</th>
                  </thead>
                  <tbody>
                    {
                      counts.length > 0 && counts.map((count, index) => (
                        
                        <tr key={index}>
                          <td className="text-left">{count.id}</td>
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
                      <td colSpan="5" className="text-left"><h4>Total</h4></td>
                      <td  className="text-center"><h4 className="p-0"><strong>R${getTotal(counts)}</strong></h4></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            
                { diference !== undefined && obs!== undefined && user === 'Rodrigo' &&
                  <div className="form-group pl-4 pr-4">
                    <label className="bmd-label-floating h3">OBS*</label>
                        <p className="h4" style={{color:'red'}}><strong>
                            Diferença: {obs} 
                        </strong>
                        </p>
                    <p className="h4">*Você vai pegar o valor (Total) 
                      {" "}<strong>R${ getTotal(counts) }</strong> + (Diferença) 
                      {" "}<strong>R${ diference }</strong> 
                      {" "}e pagar a conta de <strong> { cedae } </strong> com o valor de <strong>R${ valueCedae }.</strong> 
                    </p>
                  </div>
                }
            </div>
          </div>

          <div className="col-sm-12">
            
          </div>
        </div>
      </div>
    </div>

  )
}


