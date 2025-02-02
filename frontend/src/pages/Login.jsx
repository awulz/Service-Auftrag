import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onLogin }) {
    const [arbeiterId, setArbeiterId] = useState("");
    const [passwort, setPasswort] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = await loginUser(arbeiterId, passwort);
        console.log("API Antwort:", data); // Debugging

        if (data.user) {
            onLogin(data.user);
        } else {
            alert(data.error || "Login fehlgeschlagen");
        }
    };

    return (
        <div>
            <h2>🔐 Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Arbeiter ID" 
                    value={arbeiterId} 
                    onChange={(e) => setArbeiterId(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Passwort" 
                    value={passwort} 
                    onChange={(e) => setPasswort(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
