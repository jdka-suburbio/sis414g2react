import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './show.css';

function ShowEntidad() {   
    const [entidades, setEntidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEntidades = async () => {
        try{
            setLoading(true);
            // Request data from a public test API
            const response = await fetch('https://fuerza-g-grupo-1-9lb7.onrender.com/api/entidad');
            
            // Check if the HTTP status code is successful (200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse the response body as JSON
            const data = await response.json();
            setEntidades(data);
        } 
        catch (err) {
                setError(err.message);
            } 
        finally {
                setLoading(false);
            }
        };
        fetchEntidades();        
    },[]);    

     // 3. Handle loading state
    if (loading) {
        return <div>Loading entidades...</div>;
    }

    // 4. Handle error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Link to="/entidad/create" class="tabla-titulo">Crear nueva entidad</Link>
            <table className="table-wrapper">
                <caption>Entidades</caption>
                <thead>
                    <tr>
                        <th>Gestion</th>
                        <th>Entidad</th>
                        <th>Descripcion</th>
                        <th>Sigla</th>
                        <th>Acciones</th>
                    </tr>   
                </thead>
                <tbody id="tablaBody">
                    {entidades.map((entidad, i) => (
                        <tr key={entidad.entidad + i}>
                            <td data-label="Gestion">{entidad.gestion}</td>
                            <td data-label="Entidad">{entidad.entidad}</td>
                            <td data-label="Descripcion">{entidad.descripcion}</td>
                            <td data-label="Sigla">{entidad.sigla}</td>
                            <td data-label="Acciones">
                                <Link to={`/entidad/edit/${entidad.gestion}/${entidad.entidad}`}>Editar</Link>
                                <button onClick={() => alert(`Eliminar entidad ${entidad.entidad} de gestion ${entidad.gestion}`)}>Eliminar</button>        
                            </td>
                        </tr>
                    ))}
                </tbody>        
            </table>
        </div>
    );
}

export default ShowEntidad;

