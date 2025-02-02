import { useState } from "react";
import Login from "./pages/Login";
import AuftragForm from "./components/AuftragForm";
import AuftragsListe from "./components/AuftragsListe";
import "./App.css";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogin = (newToken) => {
        setToken(newToken);
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
