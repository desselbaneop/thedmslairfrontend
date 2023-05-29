const getUserToken = () => {
    return localStorage.getItem("accessToken")
}

const setUserToken = (token) => {
    return localStorage.setItem("accessToken", String(token))
}

module.exports = {
    getUserToken,
    setUserToken
}