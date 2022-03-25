export default function init(req, res) {
    // if (req.method !== 'POST') {
    //     res.status(405).send({ message: 'Only POST requests allowed' })
    //     return
    // }

    const data = { uuid: "cool-workstation",uuidOS: "Android"};
    const auth = "Basic " + new Buffer("rXLHTc7OSllRAFQIaGof660V80a3b9LeMVbHkCyHUPY5DvV2f29Fy1psXhQMdtjuocJeYcMSPxSYlksGHTL5M6YsafbNw34NexqXqfrSd:SnlZH8fMs0H48S0sLcuO05WMoH8GvNPgko6RqSfvZCX2kp3P2q0583QLqZWw90eyRkXiwss5pjFqhO9Lmjd1lW3fHHQdrze3HJrlUCsJp6h").toString("base64")

    fetch('https://dev-mrp.insby.tech/api/init/app', {
        method: 'POST',
        headers: {
            "Authorization": auth
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => console.log(res))
    .catch(err => console.log(err.message))
}