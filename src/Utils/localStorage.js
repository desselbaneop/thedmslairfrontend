// src/Utils/tokenStorage.js

const setAuthorizedUser = ( user ) => localStorage.setItem('user', user)
const getAuthorizedUser = () => localStorage.getItem('user');
const setFetchedUser = ( fetchedUser ) => localStorage.setItem('fetchedUser', fetchedUser)
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
}