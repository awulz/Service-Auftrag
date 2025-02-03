import { useState } from "react";
import { createAuftrag } from "../services/api";

function AuftragForm({ onAuftragErstellen }) {
    const [auftrag, setAuftrag] = useState({ kategorie: "", status: "", deadline: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prüfe, ob das Datum korrekt eingegeben wurde
        if (!auftrag.deadline || auftrag.deadline < "1900-01-01") {
            alert("Bitte ein gültiges Datum eingeben!");
            return;
        }

        const response = await createAuftrag(auftrag);
        alert(response.message);
        onAuftragErstellen(auftrag);  
        setAuftrag({ kategorie: "", status: "", deadline: "", Mitarbeiter: "" });
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
            <input
                type="text"
                placeholder="Status"
                value={auftrag.status}
                onChange={(e) => setAuftrag({ ...auftrag, status: e.target.value })}
                required
            />
            <input
                type="date"
                value={auftrag.deadline}
                onChange={(e) => setAuftrag({ ...auftrag, deadline: e.target.value })}
                required
            />
            <button type="submit">Auftrag speichern</button>
        </form>
    );
}

export default AuftragForm;
