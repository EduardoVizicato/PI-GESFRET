export interface user {
  id : string;
  firstName: string;
  lastName: string;
  taxId: {
    taxId: string;
  };
  email: string;
  phoneNumber: string;
  createdAt : string;
  updateAt? : string;
}
