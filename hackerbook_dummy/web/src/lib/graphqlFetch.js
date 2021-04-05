
const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};

export default url => {
    return (args) => {
        const body = JSON.stringify(args);
        return fetch(url, { ...options, body }).then(res => res.json());
    }
}