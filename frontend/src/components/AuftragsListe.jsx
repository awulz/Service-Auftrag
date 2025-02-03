import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuftraege } from "../services/api";
import "./AuftragsListe.css";

function AuftragsListe() {
    const [auftraege, setAuftraege] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAuftraege();
                setAuftraege(data);
            } catch (error) {
                console.error("Fehler beim Laden der API:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="auftrags-container">
            <h1>📋 Auftragsliste</h1>
            <table className="auftragstabelle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kategorie</th>
                        <th>Status</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {auftraege.map((auftrag) => (
                        <tr key={auftrag.id}>
                            <td>{auftrag.id}</td>
                            <td>{auftrag.kategorie}</td>
                            <td>{auftrag.status}</td>
                            <td>{auftrag.deadline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Button-Container für die Navigation */}
            <div className="button-container">
                <Link to="/rapporte">
                    <button className="btn rapport">📄 Zu Rapporte</button>
                </Link>
                <Link to="/auftrag-erfassen">
                    <button className="btn erfassen">📌 Auftrag erfassen</button>
                </Link>
                <Link to="/auftragsmanagement">
                    <button className="btn management">📊 Zum Auftragsmanagement</button>
                </Link>
            </div>
        </div>
    );
}

export default AuftragsListe;
