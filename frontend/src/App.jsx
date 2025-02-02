import AuftragForm from "./components/AuftragForm";
import AuftragsListe from "./components/AuftragsListe";
import { useState } from "react";
import "./App.css";

function App() {
    const [refresh, setRefresh] = useState(false); // State zum Aktualisieren der Liste

    const handleNeuerAuftrag = () => {
        setRefresh((prev) => !prev); // Triggert `useEffect` in `AuftragsListe`
    };

    return (
        <div>
            <h1>🛠️ Auftrag-Service</h1>
            <AuftragsListe refresh={refresh} />
            <AuftragForm onAuftragErstellen={handleNeuerAuftrag} />
        </div>
    );
}

export default App;
