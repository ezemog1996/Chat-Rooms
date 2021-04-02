import API from './API';

const checkAuthorization = (protect, routerHistory) => {
    const shouldProtect = protect

    API.findUser()
    .then(res => {
        if (res.data === "You need to sign in" && shouldProtect) {
            routerHistory.push('/login')
        } else if (res.data.message === "You're signed in" && !shouldProtect) {
            routerHistory.push("/dashboard")
        }
    })
    .catch(err => routerHistory.push('/login'))
}

export default checkAuthorization;