import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllRapporte, markRapportAsVerrechnet, deleteRapport } from "../services/api";

function Rapporte() {
    const { id } = useParams(); // Auftrag-ID aus der URL
    const [rapporte, setRapporte] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let data;
                if (id) {
                    console.log(`Lade Rapporte für Auftrag ${id}...`);
                    data = await getRapporte(id);
                } else {
                    console.log("Lade alle Rapporte...");
                    data = await getAllRapporte();
                }
                setRapporte(data);
            } catch (error) {
                console.error("Fehler beim Laden der Rapporte:", error);
            }
        }
        fetchData();
    }, [id]);

    // 🔹 Rapport verrechnen
    const handleMarkAsVerrechnet = async (rapportId) => {
        await markRapportAsVerrechnet(rapportId);
        setRapporte(rapporte.map(r => r.id === rapportId ? { ...r, verrechnet: 1 } : r));
    };

    // 🔹 Rapport löschen
    const handleDeleteRapport = async (rapportId) => {
        if (window.confirm("Willst du diesen Rapport wirklich löschen?")) {
            await deleteRapport(rapportId);
            setRapporte(rapporte.filter(r => r.id !== rapportId));
        }
    };

    return (
        <div>
            <h1>{id ? `Rapporte für Auftrag ${id}` : "Alle Rapporte (Bereichsleiter)"}</h1>
            {rapporte.length === 0 ? (
                <p>Keine Rapporte vorhanden</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Auftrag</th>
                            <th>Arbeiter</th>
                            <th>Datum</th>
                            <th>Dokument</th>
                            <th>Verrechnet</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rapporte.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.auftrag_id}</td>
                                <td>{r.arbeiter_id}</td>
                                <td>{new Date(r.datum).toLocaleDateString()}</td>
                                <td>
                                    <a href={`/dokumente/${r.dokument}`} download>Download</a>
                                </td>
                                <td>{r.verrechnet ? "✅" : "❌"}</td>
                                <td>
                                    {!r.verrechnet && (
                                        <button onClick={() => handleMarkAsVerrechnet(r.id)}>✔ Verrechnen</button>
                                    )}
                                    <button onClick={() => handleDeleteRapport(r.id)}>🗑 Löschen</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Rapporte;
