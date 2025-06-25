export interface User {
    id: number;
    email: string;
    fullname: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (
      email: string,
      password: string,
      fullname: string,
      username: string
    ) => Promise<void>;
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
  }