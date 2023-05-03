import axios from "axios";
import React from "react";


const [errorFlag, setErrorFlag] = React.useState(false)
const [users, setUsers] = React.useState < Array < User >> ([])
const [errorMessage, setErrorMessage] = React.useState("")

const Films = () => {
    return (<h1>Films</h1>)
}

const getFilms = () => {
    axios.get('http://localhost:3000/api/users')
        .then((response) => {
        setErrorFlag(false)
        setErrorMessage("")
        setUsers(response.data)
    }, (error) => {
        setErrorFlag(true)
        setErrorMessage(error.toString())
    })
}
export default Films;