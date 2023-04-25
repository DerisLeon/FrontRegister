import { useEffect, useState } from 'react';
import axios from 'axios';

function Formulario(){

  const[objRegistro, setobjRegistro] = useState({id : 0, solicitante:'', matricula:'', requisicao:'', setor:''});
  const[registros, setRegistros] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/registro/").then(result=>{
      setRegistros(result.data);
    })
  }, []);

  console.log(registros);


  function handleChange(event){
    setobjRegistro({...objRegistro, [event.target.name]:event.target.value});
  }

  function handleSubmit(){
    axios.post("http://localhost:8080/api/registro/", objRegistro).then(result => {
      console.log(result);
    });
  }

    return(
      <div>
        <form onSubmit={handleSubmit} className="row g-3">

            <h1>Registro de Chaves</h1>

        <div className="col-md-6">
          <label className="form-label">Solicitante:</label>
          <input onChange={handleChange} value={objRegistro.solicitante} type="text" name="solicitante" placeholder="Insira seu nome completo..." className="form-control" required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Matrícula:</label>
          <input onChange={handleChange} value={objRegistro.matricula} type="text"  name="matricula" placeholder="Insira sua matrícula..." minLength={12} className="form-control" required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipo de Registro:</label>
          <select onChange={handleChange} value={objRegistro.requisicao} name='requisicao' className="form-select">
            <option value = "Requisição">Requisição</option>
            <option value = "Devolução">Devolução</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Setor:</label>
          <select onChange={handleChange} value={objRegistro.setor} name='setor' className="form-select">
            <option defaultValue= "Default">Selecione uma opção...</option>
            <option value="Laced">Laced</option>
            <option value="Info 1">Info 1</option>
            <option value="Info 2">Info 2</option>
            <option value="Lab TSI">Lab TSI</option>
            <option value="Lab Gestão">Lab Gestão</option>
            <option value="Refeitório">Refeitório</option>
          </select>
        </div>
        
        <div className="col-12">
          <button type="submit" value="Cadastrar" className="btn btn-success">Enviar</button>
          <button type="reset" className="btn btn-danger">Limpar</button>
        </div>
        <hr/>
      </form>


      <table className="table table-borderless">
      <thead>
          <tr>
              <th>#</th>
              <th>Tipo de Registro</th>
              <th>Matrícula</th>
              <th>Solicitante</th>
              <th>Setor</th>
              <th>Data</th>
          </tr>
      </thead>

      <tbody>
         {
          registros.map((obj, i) => (
              <tr key={i}>
                  <td>{i+1}</td>
                  <td>{obj.requisicao}</td>
                  <td>{obj.matricula}</td>
                  <td>{obj.solicitante}</td>
                  <td>{obj.setor}</td>
                  <td>{obj.data}</td>
              </tr>
          ))
         }
      </tbody>
  </table>
  </div>
      
    );
}
export default Formulario;