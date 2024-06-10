// src/Utils/tokenStorage.js

const setAuthorizedUser = ( user ) => localStorage.setItem('authorizedUser', user)
const getAuthorizedUser = () => {
    const user = localStorage.getItem('authorizedUser');
    return user ? JSON.parse(user) : null;
};
const clearAuthorizedUser = () => localStorage.removeItem('authorizedUser');
const setFetchedUser = ( fetchedUser ) => localStorage.setItem('fetchedUser', fetchedUser)
const clearFetchedUser = () => localStorage.removeItem('fetchedUser')
const clearFetchingUser = () => localStorage.removeItem('fetchingId');
const getFetchedUser = () => localStorage.getItem('fetchedUser')
const setFetchingId = ( uuid  ) => localStorage.setItem('fetchingId', uuid)
const getFetchingId = () => localStorage.getItem('fetchingId')

module.exports = {
    setAuthorizedUser,
    getAuthorizedUser,
    setFetchedUser,
    getFetchedUser,
    setFetchingId,
    getFetchingId,
    clearAuthorizedUser,
    clearFetchingUser,
    clearFetchedUser,
}