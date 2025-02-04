import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRapporte } from "../services/api";

function Rapporte() {
    const { id } = useParams();
    const [rapporte, setRapporte] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getRapporte(id);
            setRapporte(data);
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <h1>Rapporte für Auftrag {id}</h1>
            {rapporte.length === 0 ? (
                <p>Keine Rapporte vorhanden</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Arbeiter ID</th>
                            <th>Datum</th>
                            <th>Dokument</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rapporte.map((rapport) => (
                            <tr key={rapport.id}>
                                <td>{rapport.id}</td>
                                <td>{rapport.arbeiter_id}</td>
                                <td>{rapport.datum}</td>
                                <td>
                                    <a href={`/dokumente/${rapport.dokument}`} download>Download</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Rapporte;
