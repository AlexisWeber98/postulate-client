

// Configuración base para las peticiones HTTP
const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY;




console.log('[DEBUG] API_URL configurada:', API_URL);
console.log('[DEBUG] API_KEY configurada:', API_KEY ? 'Presente' : 'No presente');

export { API_URL, API_KEY };
