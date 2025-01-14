
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext.js";


import {API_URL} from './config';


export default () => {
  const [resposta, setResposta] = useState('...');

  const {token} = useContext(UserContext);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: token },
    };
  
    return fetch(API_URL + "/secret", requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.ok){
          setResposta(response.data);
        }else{
          setResposta('ERROR')
        }
      })
      .catch(error => console.log(error));
    
  }, []);

 

  return (
    <main style={{ padding: "1rem 0" }}>
    <h2>Secret...</h2>
    <h3>{resposta}</h3>
  </main>
  );
};
