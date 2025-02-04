import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createRapport } from "../services/api";


function RapportHinzufuegen() {
    const { auftragId } = useParams();
    const navigate = useNavigate();
    const [rapport, setRapport] = useState({ dokument: "", arbeiter_id: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createRapport({ ...rapport, auftrag_id: auftragId });
        alert(response.message);
        navigate(`/rapporte/${auftragId}`); // Weiterleitung zur Rapport-Seite nach Speichern
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Rapport hinzufügen für Auftrag {auftragId}</h2>
            <input 
                type="text" 
                placeholder="Arbeiter ID" 
                value={rapport.arbeiter_id} 
                onChange={(e) => setRapport({ ...rapport, arbeiter_id: e.target.value })} 
                required 
            />
            <textarea
                placeholder="Dokumentation"
                value={rapport.dokument}
                onChange={(e) => setRapport({ ...rapport, dokument: e.target.value })}
                required
            />
            <button type="submit">Speichern</button>
            <button type="button" onClick={() => navigate(-1)}>Zurück</button>
        </form>
    );
}

export default RapportHinzufuegen;
