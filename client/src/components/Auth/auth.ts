const AuthProvider = {
    isAuthenticated: false,
    async SignIn(
        username: string,
        password: string,
        setError: (error: string) => void,
        callback: VoidFunction
    ) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const auth = await fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify(
                {
                    username: username,
                    password: password,
                }
            ),
            headers: headers,
        });

        if (auth.status === 200) {
            AuthProvider.isAuthenticated = true;
            callback();
        } else {
            AuthProvider.isAuthenticated = false;
            setError("Erreur de connexion")
            console.log("login password incorrect")
        }
    },
    SignOut(callback: VoidFunction) {
        AuthProvider.isAuthenticated = false;
        callback();
    },
};

interface User {
    username: string,
    role: string
}

export {AuthProvider};
export type {User};

