const API_URL = "http://localhost/Service-Auftrag-1/backend/index.php";

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
