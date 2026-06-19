import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './show.css';

function ShowEntidad() {   
    const [entidades, setEntidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEntidad, setSelectedEntidad] = useState(null);
    const [deleting, setDeleting] = useState(false);
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

    async function handleDelete() 
    {
        if (!selectedEntidad) 
            return;

        const ok = window.confirm(`Eliminar entidad ${selectedEntidad.entidad} de gestión ${selectedEntidad.gestion}?`);
        
        if (!ok) 
            return;

        setDeleting(true);
        try 
        {
            // adjust endpoint to match your API
        const url = `https://fuerza-g-grupo-1-9lb7.onrender.com/api/entidad/${selectedEntidad.entidad}`;
        const res = await fetch(url, 
        { 
            method: 'DELETE' 
        });

        if (!res.ok) 
        {
            const txt = await res.text();
            throw new Error(txt || res.statusText);
        }
        setEntidades(prev => prev.filter(e => !(e.entidad === selectedEntidad.entidad)));
        setSelectedEntidad(null);
        } 
        catch (err) 
        {
            alert('Error al eliminar: ' + (err.message || err));
        } finally 
        {
            setDeleting(false);
        }
    }

    function handleRowClick(entidad) {
        setSelectedEntidad(entidad);
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
                    </tr>   
                </thead>
                <tbody id="tablaBody">
                    {entidades.map((entidad, i) => (
                        <tr 
                            key={entidad.entidad + i} onClick={() => handleRowClick(entidad)}
                            className={selectedEntidad === entidad ? 'selected' : ''}
                        >
                            <td data-label="Gestion">{entidad.gestion}</td>
                            <td data-label="Entidad">{entidad.entidad}</td>
                            <td data-label="Descripcion">{entidad.descripcion}</td>
                            <td data-label="Sigla">{entidad.sigla}</td>
                        </tr>
                    ))}
                </tbody>        
            </table>

            <div className="control-panel">
                <button className="nav-btns">Nuevo</button>
                <button className="nav-btns">Editar</button>
                <button className="nav-btns" onClick={handleDelete} disabled={!selectedEntidad || deleting}>
                {deleting ? 'Eliminando…' : 'Eliminar'}
                </button>                
                <button className="nav-btns btn-highlight">Seleccionar</button>
                <button className="nav-btns">Salir</button>
            </div>

        </div>
    );
}

export default ShowEntidad;

