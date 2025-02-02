import { useState } from "react";

function Login({ onLogin }) {
    const [arbeiterId, setArbeiterId] = useState("");
    const [passwort, setPasswort] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost/Service-Auftrag-1/backend/index.php?request=api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ arbeiter_id: arbeiterId, passwort }),
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            onLogin(data.token);
        } else {
            alert(data.error || "Login fehlgeschlagen");
        }
    };

    return (
        <div>
            <h2>🔐 Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Arbeiter ID" value={arbeiterId} onChange={(e) => setArbeiterId(e.target.value)} required />
                <input type="password" placeholder="Passwort" value={passwort} onChange={(e) => setPasswort(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
