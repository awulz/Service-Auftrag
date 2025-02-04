import { useEffect, useState } from "react";
import { getAllRapporte, deleteRapport, markRapportAsVerrechnet } from "../services/api";

function GesamtRapporte() {
    const [rapporte, setRapporte] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllRapporte();
                console.log("Lade Rapporte:", data); // 🔹 Debugging
                setRapporte(data);
            } catch (error) {
                console.error("Fehler beim Laden der Rapporte:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Rapport wirklich löschen?")) {
            await deleteRapport(id);
            setRapporte(rapporte.filter((r) => r.id !== id));
        }
    };

    const handleMarkAsVerrechnet = async (id) => {
        await markRapportAsVerrechnet(id);
        setRapporte(
            rapporte.map((r) => (r.id === id ? { ...r, verrechnet: 1 } : r))
        );
    };

    return (
        <div>
            <h2>Alle Rapporte</h2>
            {rapporte.length === 0 ? (
                <p>Keine Rapporte vorhanden</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Auftrag</th>
                            <th>Arbeiter</th>
                            <th>Dokument</th>
                            <th>Datum</th>
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
                                <td>{r.dokument}</td>
                                <td>{new Date(r.datum).toLocaleDateString()}</td>
                                <td>{r.verrechnet ? "✅" : "❌"}</td>
                                <td>
                                    {!r.verrechnet && (
                                        <button onClick={() => handleMarkAsVerrechnet(r.id)}>
                                            Verrechnen
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(r.id)}>Löschen</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default GesamtRapporte;
