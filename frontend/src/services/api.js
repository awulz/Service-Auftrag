import axios from "axios";  // 

const API_URL = "http://localhost:8000";

export const loginUser = async (arbeiterId, passwort) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arbeiter_id: arbeiterId, passwort }),
    });

    return response.json();
};

export const getBenutzer = async () => {
    const response = await fetch(`${API_URL}/api/benutzer`);
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

export const deleteBenutzer = async (benutzerId) => {
    const response = await fetch(`${API_URL}/api/benutzer/${benutzerId}`, {
        method: "DELETE",
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


export const getAllRapporte = async () => {
    const response = await axios.get(`${API_URL}/api/rapport`);
    return response.data;
};

export const markRapportAsVerrechnet = async (rapportId) => {
    const response = await axios.patch(`${API_URL}/api/rapport/verrechnet/${rapportId}`);
    return response.data;
};
export const getAuftragById = async (auftragId) => {
    const response = await axios.get(`${API_URL}/api/auftrag/${auftragId}`);
    return response.data;
};

export const updateAuftrag = async (auftragId, auftrag) => {
    const response = await axios.put(`${API_URL}/api/auftrag/${auftragId}`, auftrag);
    return response.data;
};

export const deleteAuftrag = async (auftragId) => {
    const response = await axios.delete(`${API_URL}/api/auftrag/${auftragId}`);
    return response.data;
};

