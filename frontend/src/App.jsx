import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuftragsListe from "./components/AuftragsListe";
import AuftragForm from "./components/AuftragForm";
import Rapporte from "./Rapporte";
import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Startseite ist die AuftragsListe */}
                    <Route path="/" element={<AuftragsListe />} />

                    {/* Seiten für Rapporte und Auftrag erfassen */}
                    <Route path="/rapporte" element={<Rapporte />} />
                    <Route path="/auftrag-erfassen" element={<AuftragForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
