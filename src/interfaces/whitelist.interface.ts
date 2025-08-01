export interface WhitelistRequest {
  email: string;
}

export interface WhitelistData {
  id: string;
  email: string;
  registeredAt: string;
}

export interface WhitelistResponse {
  statusResponse: string;
  result: {
    data: WhitelistData;
  };
}
