import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuftragsListe from "./components/AuftragsListe";
import AuftragForm from "./components/AuftragForm";
import Rapporte from "./Rapporte";
import Auftragsmanagement from "./components/Auftragsmanagement";
import AuftragsBearbeitung from "./components/AuftragsBearbeitung";
import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<AuftragsListe />} />
                    <Route path="/rapporte/:id" element={<Rapporte />} />
                    <Route path="/auftrag-erfassen" element={<AuftragForm />} />
                    <Route path="/auftragsmanagement" element={<Auftragsmanagement />} />
                    <Route path="/auftrag-bearbeiten/:id" element={<AuftragsBearbeitung />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
