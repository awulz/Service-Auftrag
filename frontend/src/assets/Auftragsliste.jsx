import { useEffect, useState } from "react";
import "../App.css";

function AuftragsListe() {
  const [aufträge, setAufträge] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/index.php")
      .then(response => response.json())
      .then(data => setAufträge(data))
      .catch(error => console.error("Fehler beim Laden der Aufträge:", error));
  }, []);

  return (
    <div className="auftrag-container">
      <h1>Auftragsliste</h1>
      <ul>
        {aufträge.map((auftrag) => (
          <li key={auftrag.id}>
            {auftrag.kategorie} - {auftrag.status} (Deadline: {auftrag.deadline})
          </li>
        ))}
      </ul>
    </div>
  );
}