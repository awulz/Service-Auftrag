import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Import für Navigation
import { createAuftrag } from "../services/api";

function AuftragForm({ onAuftragErstellen }) {
    const [auftrag, setAuftrag] = useState({ kategorie: "", status: "in bearbeitung", deadline: "" });
    const navigate = useNavigate(); // 🔹 Funktion zum Navigieren

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auftrag.deadline || auftrag.deadline < "1900-01-01") {
            alert("Bitte ein gültiges Datum eingeben!");
            return;
        }

        const response = await createAuftrag(auftrag);
        alert(response.message);
        onAuftragErstellen(auftrag);
        setAuftrag({ kategorie: "", status: "in bearbeitung", deadline: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Kategorie"
                value={auftrag.kategorie}
                onChange={(e) => setAuftrag({ ...auftrag, kategorie: e.target.value })}
                required
            />

            {/* 🔹 Dropdown für Status */}
            <select 
                value={auftrag.status} 
                onChange={(e) => setAuftrag({ ...auftrag, status: e.target.value })} 
                required
            >
                <option value="in bearbeitung">In Bearbeitung</option>
                <option value="offen">Offen</option>
                <option value="erledigt">Erledigt</option>
            </select>

            <input
                type="date"
                value={auftrag.deadline}
                onChange={(e) => setAuftrag({ ...auftrag, deadline: e.target.value })}
                required
            />

            {/* 🔹 Zurück-Button */}
            <button type="button" onClick={() => navigate("/")}>⬅ Zurück</button>

            <button type="submit">Auftrag speichern</button>
        </form>
    );
}

export default AuftragForm;
