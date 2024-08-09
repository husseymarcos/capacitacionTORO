import { useState } from 'react';

export function useAuth() {
    const [user, setUser] = useState<null | { email: string; token: string }>(null);

    const login = (email: string, token: string) => {
        setUser({ email, token });
        // You can also save the token to localStorage if needed
        localStorage.setItem('user', JSON.stringify({ email, token }));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return {
        user,
        login,
        logout,
    };
}
