
import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";

const Films = () => {
    let [films, setFilms] = React.useState <Array<Film>>([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [searchInput, setSearch] = React.useState("");

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
    function searchFilms() {
        let filmList = [];

        filmList = films.filter(film => {
            film.description.includes(searchInput) || film.title.includes(searchInput)
        });
        films = filmList;
    }
    const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    };

    function FilmsList() {
        let filmList = []
        let filmRow;
        for (let i = 0; i < films.length; i += 3) {
            let tmpFilms = films.slice(i, i + 3);

            filmRow = tmpFilms.map((value: Film, index) =>
                <div className="card col-sm">
                    <Link to={"/films/" + value.filmId}>
                        <img src={"http://localhost:4941/api/v1/films/" + value.filmId + "/image"}
                             className="card-img-top" alt="Card image cap"></img>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{value.title}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <button type="button">Delete</button>
                        <button type="button">Edit</button>
                    </div>
                </div>
            )

            filmList.push(<div className={"row"}>{filmRow}</div>);
        }
        return filmList;
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
                <h1>Films</h1>
                <div style={{display: "flex"}}>
                        <div className="container">
                            <div className="input-group search-container form-control">
                                <input type="search" placeholder="search" id="searchInput" value={searchInput} onChange={handleSearch}/>
                                <button className="search-button" onClick={searchFilms}>
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                            <div className="btn-group" role="group">
                                <div className="form-check">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" defaultChecked></input>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2"></input>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3"></input>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>
                                </div>
                            </div>
                        </div>
                        <div className={"card-deck"}>
                            {FilmsList()}
                        </div>
                </div>
            </div>
        )
    }
}



export default Films;