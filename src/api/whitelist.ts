import { httpClient } from './client';
import { WhitelistRequest, WhitelistResponse } from '../interfaces/whitelist.interface';

export const whitelistApi = {
  addEmailToWhitelist: (data: WhitelistRequest) =>
    httpClient.post<WhitelistResponse>('/email/whiteList', data),
};
