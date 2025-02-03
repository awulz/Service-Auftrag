const API_URL = "http://localhost:8000";

export const loginUser = async (arbeiterId, passwort) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arbeiter_id: arbeiterId, passwort }),
    });

    return response.json();
};

export const getAuftraege = async () => {
    const response = await fetch(`${API_URL}/api/auftraege`);
    return response.json();
};

export const createAuftrag = async (auftrag) => {
    const response = await fetch(`${API_URL}/api/auftrag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auftrag),
    });
    return response.json();
};
