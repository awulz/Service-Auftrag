import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AdminBereich.css";

function BenutzerBearbeiten() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: id,
        name: "Dummy Name",
        nachname: "Dummy Nachname",
        passwort: "geheim",
        rolle: "Admin"
    });

    useEffect(() => {
        console.log("Lade Benutzerdaten für ID:", id);
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Benutzer aktualisiert:", formData); // ✅ Mock-Daten
        navigate("/adminbereich");
    };

    return (
        <div className="form-container">
            <h2>✏ Benutzer bearbeiten</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="nachname" value={formData.nachname} onChange={handleChange} required />
                <select name="rolle" value={formData.rolle} onChange={handleChange} required>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Arbeitssklave">Arbeitssklave</option>
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
