import { useEffect, useState } from "react";
import { getAuftraege } from "../services/api";

function AuftragsListe() {
    const [auftraege, setAuftraege] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getAuftraege();
            setAuftraege(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Auftragsliste</h2>
            <ul>
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
