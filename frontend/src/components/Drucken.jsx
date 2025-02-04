import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Drucken.css'; // Optional: Behalten Sie die CSS-Datei bei, falls Sie Styles verwenden

const Drucken = () => {
    const navigate = useNavigate();

    return (
        <div className="drucken-container">
            {/ Header /}
            <div className="header">
                <h1>Drucken</h1>

            </div>

            {/ Druckformular /}
            <div className="druck-form">
                <label>
                    Format Auswahl:
                    <select>
                        <option>A4</option>
                        <option>A3</option>
                    </select>
                </label>

                <label>
                    Anzahl Seiten:
                    <input type="number" min="1" />
                </label>

                <label>
                    Farbauswahl:
                    <select>
                        <option>Schwarz/Weiß</option>
                        <option>Farbe</option>
                    </select>
                </label>
            </div>

            {/ Vorschau /}
            <div className="preview">
                <h2>Vorschau des gedruckten Auftrags</h2>
                <p>(Kein Auftrag verfügbar. Füllen Sie das Formular aus.)</p>
            </div>

            {/ Buttons /}
            <div className="buttons">
                <button onClick={() => navigate(-1)}>Zurück</button>
                <button>Drucken</button>
            </div>
        </div>
    );
};

export default Drucken;