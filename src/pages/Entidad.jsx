import { useEffect, useState } from "react";

function Entidad() {   
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
            <h1>Entidad</h1>
            <p>Esta es la página de la entidad.</p>
            <table className="table-wrapper">
                <caption>Entidades</caption>
                <thead>
                    <tr>
                        <th>Gestion</th>
                        <th>Entidad</th>
                        <th>Descripcion</th>
                        <th>Sigla</th>
                    </tr>   
                </thead>
                <tbody>
                    {entidades.map((entidad, i) => (
                        <tr key={entidad.entidad + i}>
                            <td data-label="Gestion">{entidad.gestion}</td>
                            <td data-label="Entidad">{entidad.entidad}</td>
                            <td data-label="Descripcion">{entidad.descripcion}</td>
                            <td data-label="Sigla">{entidad.sigla}</td>
                        </tr>
                    ))}
                </tbody>        
            </table>
        </div>
    );
}

export default Entidad;

