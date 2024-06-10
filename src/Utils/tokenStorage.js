export const getAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    console.log('Retrieved accessToken:', token);
    return token;
};

export const getRefreshToken = () => {
    const token = localStorage.getItem('refreshToken');
    console.log('Retrieved refreshToken:', token);
    return token;
};

export const setAccessToken = (token) => {
    console.log('Setting accessToken:', token);
    localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (token) => {
    console.log('Setting refreshToken:', token);
    localStorage.setItem('refreshToken', token);
};

export const clearTokens = () => {
    console.log('Clearing tokens');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};