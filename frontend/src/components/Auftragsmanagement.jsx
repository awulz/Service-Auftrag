import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuftraege } from "../services/api";
import "./Auftragsmanagement.css";

function Auftragsmanagement() {
    const [auftraege, setAuftraege] = useState([]);
    const navigate = useNavigate();

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

    // 🔹 Funktion zum Hinzufügen eines neuen Rapports
    const handleAddRapport = (auftragId) => {
        navigate(`/rapport-hinzufuegen/${auftragId}`);
    };

    return (
        <div className="container">
            {/* Seitenleiste für Navigation */}
            <div className="sidebar">
                <Link to="/"><button>📋 Auftragsliste</button></Link>
                <Link to="/rapport"><button>📄 Rapporte</button></Link>
                <Link to="/auftragsmanagement"><button className="active">📊 Auftragsmanagement</button></Link>
                <Link to="/admin"><button>🔧 Admin</button></Link>
            </div>

            {/* Hauptbereich */}
            <div className="main-content">
                <h1>📊 Auftragsmanagement</h1>
                <table className="auftragstabelle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Arbeitskategorie</th>
                            <th>Status</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auftraege.map((auftrag) => (
                            <tr key={auftrag.id}>
                                <td>{auftrag.id}</td>
                                <td>{auftrag.kategorie}</td>
                                <td>{auftrag.status}</td>
                                <td className="button-cell">
                                    {/* Bearbeiten-Button */}
                                    <Link to={`/auftrag-bearbeiten/${auftrag.id}`}>
                                        <button className="btn bearbeiten">✏ Bearbeiten</button>
                                    </Link>

                                    {/* Rapporte anzeigen */}
                                    <Link to={`/rapporte/${auftrag.id}`}>
                                        <button className="btn rapport">📄 Rapporte</button>
                                    </Link>

                                    {/* Rapport hinzufügen */}
                                    <button className="btn add-rapport" onClick={() => handleAddRapport(auftrag.id)}>➕ Rapport hinzufügen</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Zurück zur Auftragsliste */}
                <div className="button-container">
                    <Link to="/">
                        <button className="btn back">⬅ Zurück zur Auftragsliste</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Auftragsmanagement;
