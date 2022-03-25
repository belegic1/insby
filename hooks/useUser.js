import {
    useMutation,
    useQuery,
    useQueryClient
    
} from 'react-query'




async function register(token) {
    if (token) {
        const raw = {
            "login": "testNalog",
            "email": "testNalog@gmail.com",
            "password": "123",
            "confirmPassword": "123",
            "rememberMe": true,
            "autoRegister": true,
            "admin": false
        }
        const requestOptions = {
            method: 'POST',

            body: JSON.stringify(raw),
            redirect: 'follow',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

       try {
            const response = await fetch("https://dev-mrp.insby.tech/api/session/sign-in", requestOptions);
            const result_1 = await response.json();
            return result_1;
        } catch (error) {
            return console.log('error', error);
        }
    }
}

export const useUser = () => {
    return useQuery("user", ()=> ({}))
}

export const useRegisterUser = () => {  
    const queryClient = useQueryClient()
    return useMutation(register, {
        onSuccess: data => {
            queryClient.setQueryData("user", (oldData) => {
                return data.data
            })
        }
    })
}