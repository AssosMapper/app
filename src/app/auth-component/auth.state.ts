import { User } from "../models/user.model";

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null
};
