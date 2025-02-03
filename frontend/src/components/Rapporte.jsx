import { useParams, Link } from "react-router-dom";
import "./Rapporte.css";

function Rapporte() {
    const { id } = useParams();

    return (
        <div className="rapporte-container">
            <h1>📄 Rapporte für Auftrag {id || "alle"}</h1>

            <table className="rapporte-tabelle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Datum</th>
                        <th>Auftrag ID</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* API-Daten hier einfügen */}
                </tbody>
            </table>

            <div className="button-container">
                <Link to="/">
                    <button className="btn zurück">⬅ Zurück zur Auftragsliste</button>
                </Link>
            </div>
        </div>
    );
}

export default Rapporte;
