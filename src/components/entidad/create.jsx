import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEntidad() {
    const [gestion, setGestion] = useState("");
    const [entidad, setEntidad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [sigla, setSigla] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();    

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = { gestion, entidad, descripcion, sigla };
        setLoading(true);      
        
        try {
            const response = await fetch('https://fuerza-g-grupo-1-9lb7.onrender.com/api/entidad', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(txt || response.statusText);
            }

            setGestion(''); 
            setEntidad(''); 
            setDescripcion(''); 
            setSigla('');
            navigate('/entidad');
        } catch (err) 
        {
            setError(err.message || 'Error al crear entidad');
        } finally 
        {
            setLoading(false);
        }        
    }

    return (
        <div>
            <h1>Crear Entidad</h1>
            {error && <div style={{color:'red'}}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="gestion">Gestion:</label>
                    <input type="number" id="gestion" name="gestion" value={gestion} onChange={(e) => setGestion(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="entidad">Entidad:</label>
                    <input type="number" id="entidad" name="entidad" value={entidad} onChange={(e) => setEntidad(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripcion:</label>
                    <input type="text" id="descripcion" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="sigla">Sigla:</label>
                    <input type="text" id="sigla" name="sigla" value={sigla} onChange={(e) => setSigla(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear'}
                </button>                
            </form>
        </div>
    );     
}

export default CreateEntidad;
