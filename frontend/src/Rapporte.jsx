import React, { useState, useEffect } from "react";
import { getRapporte, createRapport, deleteRapport, markRapportAsVerrechnet } from "./services/api";

const Rapporte = () => {
    const [rapporte, setRapporte] = useState([]);
    const [auftragId, setAuftragId] = useState(""); // Welcher Auftrag wird geladen?
    const [newRapport, setNewRapport] = useState({ auftrag_id: "", arbeiter_id: "", dokument: "" });

   
    const fetchRapporte = async () => {
        if (!auftragId) return;
        try {
            const data = await getRapporte(auftragId);
            setRapporte(data);
        } catch (error) {
            console.error("Fehler beim Laden der Rapporte:", error);
        }
    };

  
    const handleSaveRapport = async (event) => {
        event.preventDefault();
        try {
            await createRapport(newRapport);
            alert("Rapport gespeichert!");
            fetchRapporte(); // Neu laden
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
        }
    };

   
    const handleDeleteRapport = async (rapportId) => {
        try {
            await deleteRapport(rapportId);
            alert("Rapport gelöscht!");
            fetchRapporte();
        } catch (error) {
            console.error("Fehler beim Löschen:", error);
        }
    };

    const handleMarkVerrechnet = async (rapportId) => {
        try {
            await markRapportAsVerrechnet(rapportId);
            alert("Rapport verrechnet!");
            fetchRapporte();
        } catch (error) {
            console.error("Fehler beim Markieren:", error);
        }
    };

    useEffect(() => {
        fetchRapporte();
    }, [auftragId]);

    return (
        <div>
            <h2>Rapporte verwalten</h2>
            <input
                type="number"
                placeholder="Auftrag ID eingeben"
                value={auftragId}
                onChange={(e) => setAuftragId(e.target.value)}
            />
            <button onClick={fetchRapporte}>Rapporte laden</button>

            <h3>Neuen Rapport hinzufügen</h3>
            <form onSubmit={handleSaveRapport}>
                <input
                    type="number"
                    placeholder="Auftrag ID"
                    value={newRapport.auftrag_id}
                    onChange={(e) => setNewRapport({ ...newRapport, auftrag_id: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Arbeiter ID"
                    value={newRapport.arbeiter_id}
                    onChange={(e) => setNewRapport({ ...newRapport, arbeiter_id: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Dokument"
                    value={newRapport.dokument}
                    onChange={(e) => setNewRapport({ ...newRapport, dokument: e.target.value })}
                    required
                />
                <button type="submit">Speichern</button>
            </form>

            <h3>Rapporte</h3>
            <ul>
                {rapporte.map((rapport) => (
                    <li key={rapport.id}>
                        {rapport.dokument} - Arbeiter: {rapport.arbeiter_id} - 
                        <button onClick={() => handleDeleteRapport(rapport.id)}>Löschen</button>
                        <button onClick={() => handleMarkVerrechnet(rapport.id)}>Als verrechnet markieren</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rapporte;
