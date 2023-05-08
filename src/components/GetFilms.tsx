
import Films from "../Pages/Films";
import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function GetFilms() {
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [films, setFilms] = React.useState < Array < Film >> ([])
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        getFilms()
    }, [])

    const getFilms = () => {
        axios.get('http://localhost:3000/api/films')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setFilms(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const list_of_films = () => {
        return films.map((item: Film) =>
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>
                    <Link to={"/films/" + item.id}>Go to film</Link>
                </td>
                <td>
                    <button type="button">Delete</button>
                    <button type="button">Edit</button>
                </td>
            </tr>
        )
    }
    const FilmTable = () => {
        if (errorFlag) {
            return (
                <div>
                    <div style={{ color: "red" }}>
                        {errorMessage}
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {list_of_films()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
    return (
        <div>
            {FilmTable()}
        </div>
    )
}



export default GetFilms;