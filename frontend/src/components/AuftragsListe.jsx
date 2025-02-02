import { useEffect, useState } from "react";
import { getAuftraege } from "../services/api";

function AuftragsListe({ refresh }) {
    const [auftraege, setAuftraege] = useState([]);

    useEffect(() => {
        console.log("Fetching API-Daten..."); // <-- Debugging
        async function fetchData() {
            try {
                const data = await getAuftraege();
                console.log("API Response:", data); // <-- Debugging
                setAuftraege(data);
            } catch (error) {
                console.error("Fehler beim Laden der API:", error);
            }
        }
        fetchData();
    }, [refresh]);

    return (
        <div>
            <h2>📋 Auftragsliste</h2>
            <ul>
                {auftraege.length === 0 ? <p>⚠️ Keine Aufträge gefunden.</p> : null}
                {auftraege.map((auftrag) => (
                    <li key={auftrag.id}>
                        {auftrag.kategorie} - {auftrag.status} (Deadline: {auftrag.deadline})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AuftragsListe;
