class ApiService {
    static async get(endpoint) {
        try {
            const response = await fetch(`${Config.API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`Error GET: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
            return [];
        }
    }

    static async post(endpoint, data) {
        try {
            const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            alert("Error al guardar datos");
            return null;
        }
    }

    static async delete(endpoint) {
        try {
            await fetch(`${Config.API_BASE_URL}${endpoint}`, { method: 'DELETE' });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}