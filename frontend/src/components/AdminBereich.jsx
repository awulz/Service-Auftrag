import { Link } from "react-router-dom";
import { useState } from "react";
import "./AdminBereich.css";

function AdminBereich() {
    const [users, setUsers] = useState([
        { id: 1, name: "Max", rolle: "Admin" },
        { id: 2, name: "Lisa", rolle: "Manager" },
        { id: 3, name: "Tom", rolle: "Arbeitssklave" }
    ]);

    const handleDelete = (id) => {
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
                            <th>Name</th>
                            <th>Rolle</th>
                            <th>Aktion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
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
                            <tr><td colSpan="4">Keine Benutzer gefunden</td></tr>
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
