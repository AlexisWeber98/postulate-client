import { httpClient } from './client';

interface WhitelistRequest {
  email: string;
}

interface WhitelistData {
  id: string;
  email: string;
  registeredAt: string;
}

interface WhitelistResponse {
  statusResponse: string;
  result: {
    data: WhitelistData;
  };
}

export const whitelistApi = {
  addEmailToWhitelist: (data: WhitelistRequest) =>
    httpClient.post<WhitelistResponse>('/email/whiteList', data),
};
