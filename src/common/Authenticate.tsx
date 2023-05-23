
const Authenticate = () => {

    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser !== null && loggedInUser.length !== 0) {
        try {
            const foundUser = JSON.parse(loggedInUser);
            return foundUser;
        } catch (error) {
            console.log(error);
        }
    }
    return null;
}

export default Authenticate