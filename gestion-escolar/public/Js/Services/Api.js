class ApiService {
    static async get(endpoint) {
        try {
            const response = await fetch(`${Config.API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`Error GET: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(error);
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
            alert("Error al guardar datos. Revisa la consola.");
            return null;
        }
    }

    // NUEVO: Para editar (Requisito 4.3)
    static async put(endpoint, data) {
        try {
            const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar datos.");
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