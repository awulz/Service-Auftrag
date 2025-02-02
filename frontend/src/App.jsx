import { useState } from "react";
import Login from "./pages/Login";
import AuftragForm from "./components/AuftragForm";
import AuftragsListe from "./components/AuftragsListe";
import "./App.css";

function App() {
    const [token, setToken] = useState(null); // Keine JWT mehr, nur User-Daten

    const handleLogin = (user) => {
        setToken(user);
    };

    return (
        <div>
            {token ? (
                <>
                    <h1>🛠️ Auftrag-Service</h1>
                    <AuftragsListe />
                    <AuftragForm />
                </>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
