const BASE_URL = 'http://172.20.10.12:8000'; // Reemplaza con tu IP local y puerto

export const getPlanets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/planets`);
    if (!response.ok) throw new Error('Error al obtener los planetas');
    return await response.json();
  } catch (error) {
    console.error('Error en getPlanets:', error);
    throw error;
  }
};

export const addPlanet = async (planet) => {
  try {
    const response = await fetch(`${BASE_URL}/planets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planet),
    });
    if (!response.ok) throw new Error('Error al agregar el planeta');
    return await response.json();
  } catch (error) {
    console.error('Error en addPlanet:', error);
    throw error;
  }
};

export const deletePlanet = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/planets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el planeta');
  } catch (error) {
    console.error('Error en deletePlanet:', error);
    throw error;
  }
};

export const editPlanet = async (id, updatedPlanet) => {
  try {
    const response = await fetch(`${BASE_URL}/planets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPlanet),
    });
    console.log(response);
    const responseData = await response.json(); // Aquí puede estar el problema

    console.log('Datos actualizados en el servidor:', responseData);

    return response;
    if (!response.ok) {
      throw new Error(`Error al editar el planeta: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en editPlanet:', error);
    throw error;
  }
};
