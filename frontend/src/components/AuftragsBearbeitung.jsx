import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuftragById, updateAuftrag, deleteAuftrag } from "../services/api";
import "./AuftragsBearbeitung.css";

function AuftragsBearbeitung() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auftrag, setAuftrag] = useState({
        kategorie: "",
        status: "Offen",
        deadline: "",
        verrechnet: "Nein",
    });

    // 🔹 Auftrag laden
    useEffect(() => {
        async function fetchAuftrag() {
            try {
                const data = await getAuftragById(id);
                setAuftrag(data);
            } catch (error) {
                console.error("Fehler beim Laden des Auftrags:", error);
            }
        }
        fetchAuftrag();
    }, [id]);

    // 🔹 Auftrag speichern
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateAuftrag(id, auftrag);
            alert("Auftrag gespeichert!");
            navigate("/auftragsmanagement");
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
        }
    };

    // 🔹 Auftrag löschen
    const handleDelete = async () => {
        if (window.confirm("Willst du diesen Auftrag wirklich löschen?")) {
            try {
                await deleteAuftrag(id);
                alert("Auftrag gelöscht!");
                navigate("/auftragsmanagement");
            } catch (error) {
                console.error("Fehler beim Löschen:", error);
            }
        }
    };

    return (
        <div className="bearbeiten-container">
            <h1>✏ Auftrags Bearbeitung</h1>
            <form onSubmit={handleSave}>
                <label>Arbeitskategorie</label>
                <input
                    type="text"
                    value={auftrag.kategorie}
                    onChange={(e) => setAuftrag({ ...auftrag, kategorie: e.target.value })}
                    required
                />

                <label>Arbeiter ID</label>
                <input
                    type="text"
                    value={auftrag.arbeiter_id}
                    onChange={(e) => setAuftrag({ ...auftrag, arbeiter_id: e.target.value })}
                />

                <label>Deadline Datum</label>
                <input
                    type="date"
                    value={auftrag.deadline}
                    onChange={(e) => setAuftrag({ ...auftrag, deadline: e.target.value })}
                    required
                />

                <label>Status</label>
                <select value={auftrag.status} onChange={(e) => setAuftrag({ ...auftrag, status: e.target.value })}>
                    <option>Offen</option>
                    <option>In Bearbeitung</option>
                    <option>Abgeschlossen</option>
                </select>

                <label>Verrechnet</label>
                <select value={auftrag.verrechnet} onChange={(e) => setAuftrag({ ...auftrag, verrechnet: e.target.value })}>
                    <option>Ja</option>
                    <option>Nein</option>
                </select>

                <div className="buttons">
                    <button type="button" className="delete" onClick={handleDelete}>🗑 Auftrag Löschen</button>
                    <button type="submit" className="save">💾 Auftrag Speichern</button>
                </div>
            </form>
            <Link to="/auftragsmanagement"><button className="back">⬅ Zurück</button></Link>
        </div>
    );
}

export default AuftragsBearbeitung;
