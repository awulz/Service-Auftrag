import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminBereich.css";

function BenutzerHinzufuegen() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        nachname: "",
        passwort: "",
        rolle: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Neuer Benutzer:", formData); // ✅ Mock-Daten
        navigate("/adminbereich");
    };

    return (
        <div className="form-container">
            <h2>➕ Benutzer hinzufügen</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" placeholder="Arbeiter ID" onChange={handleChange} required />
                <input type="text" name="name" placeholder="Vorname" onChange={handleChange} required />
                <input type="text" name="nachname" placeholder="Nachname" onChange={handleChange} required />
                <input type="password" name="passwort" placeholder="Passwort" onChange={handleChange} required />
                
                <select name="rolle" onChange={handleChange} required>
                    <option value="">Wähle eine Rolle...</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Arbeitssklave">Arbeitssklave</option>
                </select>

                <div className="button-container">
                    <Link to="/adminbereich">
                        <button className="btn back">⬅ Zurück</button>
                    </Link>
                    <button type="submit" className="btn save">💾 Speichern</button>
                </div>
            </form>
        </div>
    );
}

export default BenutzerHinzufuegen;
