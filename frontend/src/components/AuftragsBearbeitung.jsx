import { useParams, Link } from "react-router-dom";
import "./AuftragsBearbeitung.css";

function AuftragsBearbeitung() {
    const { id } = useParams();

    return (
        <div className="bearbeiten-container">
            <h1>✏ Auftrags Bearbeitung</h1>
            <form>
                <label>Arbeiter ID</label>
                <input type="text" placeholder="Arbeiter ID" />

                <label>Deadline Datum</label>
                <input type="date" />

                <label>Status</label>
                <select>
                    <option>Offen</option>
                    <option>In Bearbeitung</option>
                    <option>Abgeschlossen</option>
                </select>

                <label>Verrechnet</label>
                <select>
                    <option>Ja</option>
                    <option>Nein</option>
                </select>

                <div className="buttons">
                    <button className="delete">🗑 Auftrag Löschen</button>
                    <button className="save">💾 Auftrag Speichern</button>
                </div>
            </form>
            <Link to="/auftragsmanagement"><button className="back">⬅ Zurück</button></Link>
        </div>
    );
}

export default AuftragsBearbeitung;
