const API_URL = "http://localhost/Service-Auftrag-1/backend/index.php";

export const loginUser = async (arbeiterId, passwort) => {
    const response = await fetch(`${API_URL}?request=api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arbeiter_id: arbeiterId, passwort }),
    });

    return response.json();
};

export const getAuftraege = async () => {
    const response = await fetch(`${API_URL}?request=api/auftraege`);
    return response.json();
};

export const createAuftrag = async (auftrag) => {
    const response = await fetch(`${API_URL}?request=api/auftrag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auftrag),
    });
    return response.json();
};

export const getRapporte = async (auftragId) => {
    const response = await axios.get(`${API_URL}/api/rapport/${auftragId}`);
    return response.data;
};

export const createRapport = async (rapport) => {
    const response = await axios.post(`${API_URL}/api/rapport`, rapport);
    return response.data;

};

export const deleteRapport = async (rapportId) => {
    const response = await axios.delete(`${API_URL}/api/rapport/${rapportId}`);
    return response.data;

};

export const markRapportAsVerrechnet = async (rapportId) => {
    const response = await axios.patch(`${API_URL}/api/rapport/verrechnet/${rapportId}`);
    return response.data;
};