import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuftragsListe from "./components/AuftragsListe";
import AuftragForm from "./components/AuftragForm";
import Rapporte from "./components/Rapporte";
import Auftragsmanagement from "./components/Auftragsmanagement";
import AuftragsBearbeitung from "./components/AuftragsBearbeitung";
import AdminBereich from "./components/AdminBereich";  
import BenutzerHinzufuegen from "./components/Benutzerhinzufuegen";
import BenutzerBearbeiten from "./components/Benutzerbearbeiten"; 

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
                    
                    {/* ✅ Korrekte Schreibweise */}
                    <Route path="/adminbereich" element={<AdminBereich />} />
                    <Route path="/admin/benutzerhinzufuegen" element={<BenutzerHinzufuegen />} />
                    <Route path="/admin/benutzerbearbeiten/:id" element={<BenutzerBearbeiten />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
