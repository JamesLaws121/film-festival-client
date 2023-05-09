
import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const FilmTable = () => {
    const [films, setFilms] = React.useState <Array<Film>>([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        GetFilms()
    }, [])

    const GetFilms = () => {
        axios.get('http://localhost:4941/api/v1/films')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setFilms(response.data.films)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    function FilmsList() {

        return films.map((value: Film) =>
            <tr key={value.id}>
                <div className="card">
                    <Link to={"/films/" + value.id}>
                        <img src="../public/logo192.png" className="card-img-top" alt="../public/logo192.png"></img>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{value.title}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <button type="button">Delete</button>
                        <button type="button">Edit</button>
                    </div>
                </div>
            </tr>
        )
    }

    if (errorFlag) {
        return (
            <div>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>

                    </tr>
                    </thead>
                    <tbody>
                    {FilmsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}



export default FilmTable;