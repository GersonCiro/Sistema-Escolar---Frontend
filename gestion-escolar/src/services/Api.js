import Config from '../config/Config';

class ApiService {
  static async get(endpoint) {
    try {
      const response = await fetch(`${Config.API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        console.error(`GET Error: ${response.status}`);
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error('GET Error:', error);
      return [];
    }
  }

  static async post(endpoint, data) {
    try {
      const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error(`POST Error: ${response.status}`);
        return null;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('POST Error:', error);
      return null;
    }
  }

  static async put(endpoint, data) {
    try {
      const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.error(`PUT Error: ${response.status}`);
        return null;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('PUT Error:', error);
      return null;
    }
  }

  static async delete(endpoint) {
    try {
      const response = await fetch(`${Config.API_BASE_URL}${endpoint}`, { 
        method: 'DELETE' 
      });
      if (!response.ok) {
        console.error(`DELETE Error: ${response.status}`);
        return false;
      }
      return true;
    } catch (error) {
      console.error('DELETE Error:', error);
      return false;
    }
  }
}

export default ApiService;
