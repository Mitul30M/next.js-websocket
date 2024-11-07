export {};

declare global {
  export type SessionClaims= {
    userDB_id: string;
  }

  export type PublicMetadataType = {
    userDB_id?: string;
  };
  
  export type MessageType = {
    userDB_id: string;
    message: string;
  };
}
