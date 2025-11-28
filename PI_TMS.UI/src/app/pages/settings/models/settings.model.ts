export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  taxId: {
    taxId: string;
  }
  phoneNumber: string;
}
export interface EnterpriseInfo {
  id: string;
  name: string;
  email: string;
  taxId: {
    taxId: string;
  }
}

export interface ChangePasswordPayload {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}