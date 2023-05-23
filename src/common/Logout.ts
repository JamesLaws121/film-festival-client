import axios from "axios";

const logout = (token: string) => {
    axios.post("http://localhost:4941/api/v1/users/logout", null,{
        headers: {
            'X-Authorization': token,
        }
    }).then((response) => {
        sessionStorage.removeItem('user');
        console.log(response);
        return true;
    }).catch((error) => {
        console.log(error);
    });
    return false;
}

export default logout;