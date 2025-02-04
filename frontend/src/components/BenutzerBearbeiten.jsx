import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBenutzerById, updateBenutzer } from "../services/api";  // ✅ API-Funktionen importieren
import "./AdminBereich.css";

function BenutzerBearbeiten() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: id,
        name: "",
        nachname: "",
        passwort: "",
        rolle: ""
    });

    // 🔹 Benutzerdaten abrufen
    useEffect(() => {
        async function fetchBenutzer() {
            try {
                const data = await getBenutzerById(id);
                setFormData(data);  // ✅ Benutzerdaten setzen
            } catch (error) {
                console.error("Fehler beim Laden des Benutzers:", error);
            }
        }
        fetchBenutzer();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Benutzer speichern
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBenutzer(id, formData);  // ✅ Änderungen speichern
            alert("Benutzer gespeichert!");
            navigate("/adminbereich");
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>✏ Benutzer bearbeiten</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="nachname" value={formData.nachname} onChange={handleChange} required />
                <select name="rolle" value={formData.rolle} onChange={handleChange} required>
                    <option value="Admin">Admin</option>
                    <option value="Breichsleiter">Bereichsleiter</option>
                    <option value="Mitarbeiter">Mitarbeiter</option>
                </select>
                <div className="button-container">
                    <Link to="/adminbereich"><button className="btn back">⬅ Zurück</button></Link>
                    <button type="submit" className="btn save">💾 Speichern</button>
                </div>
            </form>
        </div>
    );
}

export default BenutzerBearbeiten;
