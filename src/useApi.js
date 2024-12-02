export const UseApi = async (url, options) => {
    const apiUrl = process.env.REACT_APP_BASE_URL + url;
    const token = process.env.REACT_APP_API_KEY;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token ?? ''}`,
    };

    options.headers = headers;
    const queryString = new URLSearchParams(options.params).toString();

    const response = await fetch(`${apiUrl}?${queryString}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();

}