export interface User {
    id: number;
    email: string;
    fullname: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string)=>Promise<void>;
    logout: ()=>void;
    isAuthenticated: boolean;

}