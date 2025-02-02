import { useState } from "react";
import "../App.css";

function AuftragForm({ onAuftragErstellen }) {
  const [neuerAuftrag, setNeuerAuftrag] = useState({ kategorie: "", status: "", deadline: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/index.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(neuerAuftrag),
    })
      .then(response => response.json())
      .then(data => {
        onAuftragErstellen(data.auftrag);
        setNeuerAuftrag({ kategorie: "", status: "", deadline: "" });
      })
      .catch(error => console.error("Fehler beim Senden des Auftrags:", error));
  };

  return (
    <div className="auftrag-form">
      <h2>Neuen Auftrag erstellen</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kategorie"
          value={neuerAuftrag.kategorie}
          onChange={(e) => setNeuerAuftrag({ ...neuerAuftrag, kategorie: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={neuerAuftrag.status}
          onChange={(e) => setNeuerAuftrag({ ...neuerAuftrag, status: e.target.value })}
        />
        <input
          type="date"
          value={neuerAuftrag.deadline}
          onChange={(e) => setNeuerAuftrag({ ...neuerAuftrag, deadline: e.target.value })}
        />
        <button type="submit">Auftrag speichern</button>
      </form>
    </div>
  );
}