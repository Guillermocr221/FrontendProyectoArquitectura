
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./formRegister.css";

export function FormRegister( props ){

    
    const [inputName, setInputName] = useState('');
    const [cardId, setCardId] = useState(''); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) =>{
        setInputName(e.target.value);
    }

    const handleSelectChange = (e)=>{
        setCardId(parseInt(e.target.value));
    }

    // Obtener Número de tarjeta
    // const fetchCardNumber = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     try {
    //         const response = await fetch('http://localhost:3000/api/card');
    //         const data = await response.json();
    //         if (data) {
    //             setCardNumber(data);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Registrar Usuario
    const registerUser = (e) => {
      e.preventDefault();

      let nombre = inputName;
      const fecha_registro = new Date().toISOString().split('T')[0];

      let url = "http://localhost:3000/users";
      fetch( url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, fecha_registro, cardId }),
      })
        .then(response => response.json())
        .then(data => {
            if (data) { 
            //   navigate('/about'); // Redirección
            } else {
              console.log('Error en el registro:');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });

        // console.log(inputName +': '+ cardNumber)
        setTimeout( ()=>{
            navigate('/'); 
        },2000)
    };

    return(
        <div className="box">
            <form onSubmit={registerUser}>                
                <div className="input__wrapper">
                    <input 
                        id="nombre" 
                        type="text" 
                        name="nombre" 
                        placeholder="Tu nombre" 
                        className="input__field"
                        required 
                        value={inputName}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <label htmlFor="nombre" className="input__label">
                        Nombres
                    </label>
                </div>
                
                <div className="input__wrapper">
                    <select 
                    name="card" 
                    id="card" 
                    className="input__field " 
                    onChange={handleSelectChange}
                    defaultValue="">

                        <option  className="input__field--bl " value="" disabled>Seleccione tarjeta</option>
                        
                        {
                            //mostrar solo cards que no tengan un usuario asignado
                            props.DBCards.filter((card) => card.idUsuario == null).map( (card, index) => ( 
                            <option key={index} className="input__field--bl " value={card.id}>{card.codigo_card}</option>
                        )) 
                        }
                        
                    </select>
                
                </div>
                {/* <button onClick={fetchCardNumber} className="detectarTarjeta">
                    {buttonText}
                </button> */}
                
                <button type="submit">Registrar Usuario</button>

            </form>
        </div>
    );
}
