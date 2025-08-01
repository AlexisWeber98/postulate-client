import { httpClient } from './client';

// Interfaz para la respuesta de la API de IA (ejemplo)
interface IaResponseResult {
  iaText: string;
  tokensRemaining: number;
}

interface IaApiResponse {
  statusResponse: string;
  result: {
    iaResponse: IaResponseResult;
  };
}

// Interfaz para los datos de la solicitud a la API de IA (ejemplo)
interface IaRequestData {
  prompt: string;
}

// Servicio para la API de IA
export const iaApi = {
  /**
   * Genera una respuesta de IA basada en un prompt.
   * @param data - Los datos para la solicitud de generación de IA.
   * @returns Una promesa que resuelve con la respuesta generada por la IA.
   */
  generateResponse: (data: IaRequestData) => httpClient.post<IaApiResponse>('/ia', data),

  // Puedes añadir más métodos aquí para otras funcionalidades de IA
  // Por ejemplo: analyzeOffer: (data: OfferAnalysisRequest) => httpClient.post<IaApiResponse>('/ia/analyze', data),
};
