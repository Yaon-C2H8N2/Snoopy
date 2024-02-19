import Cookies from 'js-cookie';

class Network {
    public static async fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> {
        const token = Cookies.get('token');
        const wrappedHeaders = new Headers(init?.headers) || new Headers();
        (wrappedHeaders as Headers).append('Authorization', `Bearer ${token}`);
        init = {
            ...init,
            headers: wrappedHeaders,
        };
        console.log('fetching', input, init);
        return fetch(input, init);
    }
}

export default Network