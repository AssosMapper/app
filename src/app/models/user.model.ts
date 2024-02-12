export interface User {
  id?: number;
  sexe: string;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: Date;
  dateCreated: Date;
  roleId?: number;
  phoneNumber: string;
  email: string;
  nationality: string;
  password: string;
}
