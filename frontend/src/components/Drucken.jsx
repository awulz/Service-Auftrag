import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Drucken.css';

const Drucken = () => {
    const navigate = useNavigate();

    return (
        <div className="drucken-container">
            <div className="header">
                <h1>🖨️ Drucken</h1> {/* Unicode-Symbol statt React-Icon */}
            </div>
            <div className="druck-form">
                <label>Format Auswahl</label>
                <select>
                    <option>A4</option>
                    <option>A3</option>
                </select>

                <label>Anzahl Seiten</label>
                <input type="number" min="1" />

                <label>Farbauswahl</label>
                <select>
                    <option>Schwarz/Weiß</option>
                    <option>Farbe</option>
                </select>
            </div>
            <div className="preview">Vorschau des gedruckten Auftrags</div>
            <div className="buttons">
                <button onClick={() => navigate(-1)}>⬅ Zurück</button>
                <button>🖨️ Drucken</button>
            </div>
        </div>
    );
};

export default Drucken;
