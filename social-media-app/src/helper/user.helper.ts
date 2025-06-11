import { useAuth } from "../hooks/useAuth";

export const LoggedUser = () => {
    const {user} = useAuth();
    return user;
}