import { useState,useEffect } from "react"

export const useToken = () => {
    const [token, setToken] = useState(null)


    const auth = "Basic " + new Buffer("rXLHTc7OSllRAFQIaGof660V80a3b9LeMVbHkCyHUPY5DvV2f29Fy1psXhQMdtjuocJeYcMSPxSYlksGHTL5M6YsafbNw34NexqXqfrSd:SnlZH8fMs0H48S0sLcuO05WMoH8GvNPgko6RqSfvZCX2kp3P2q0583QLqZWw90eyRkXiwss5pjFqhO9Lmjd1lW3fHHQdrze3HJrlUCsJp6h").toString("base64")

    function fetchData() {
        const raw = { "uuid": "04b9a5fd-38ce-436e-873b-f28c4e847426", "uuidOS": "Linux" };

        const requestOptions = {
            method: 'POST',

            body: JSON.stringify(raw),
            redirect: 'follow',
            headers: {
                "Authorization": auth,
                'Content-Type': 'application/json'
            },
        };

        fetch("https://dev-mrp.insby.tech/api/init/app", requestOptions)
            .then(response => response.json())
            .then(result => setToken(result.data.token))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return token
}