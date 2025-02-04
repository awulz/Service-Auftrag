import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBenutzer, deleteBenutzer } from "../services/api"; // API importieren
import "./AdminBereich.css";

function AdminBereich() {
    const [users, setUsers] = useState([]);

    // 🔹 Benutzer aus der API laden
    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getBenutzer();
                setUsers(data);
            } catch (error) {
                console.error("Fehler beim Laden der Benutzer:", error);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteBenutzer(id);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <Link to="/"><button>📋 Auftragsliste</button></Link>
                <Link to="/rapporte"><button>📄 Rapporte</button></Link>
                <Link to="/auftragsmanagement"><button>📊 Auftragsmanagement</button></Link>
                <Link to="/adminbereich"><button className="active">🔧 Admin</button></Link>
            </div>

            <div className="main-content">
                <h1>🔧 Admin</h1>
                <div className="top-section">
                    <h2>Benutzerliste</h2>
                    <Link to="/admin/benutzerhinzufuegen">
                        <button className="btn add-user">➕ Benutzer hinzufügen</button>
                    </Link>
                </div>

                <table className="admin-tabelle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vorname</th>
                            <th>Nachname</th>
                            <th>Rolle</th>
                            <th>Aktion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.vorname}</td>
                                    <td>{user.nachname}</td>
                                    <td>{user.rolle}</td>
                                    <td className="button-cell">
                                        <Link to={`/admin/benutzerbearbeiten/${user.id}`}>
                                            <button className="btn edit">✏ Bearbeiten</button>
                                        </Link>
                                        <button className="btn delete" onClick={() => handleDelete(user.id)}>🗑 Löschen</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">Keine Benutzer gefunden</td></tr>
                        )}
                    </tbody>
                </table>

                <div className="button-container">
                    <Link to="/">
                        <button className="btn back">⬅ Zurück</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminBereich;
