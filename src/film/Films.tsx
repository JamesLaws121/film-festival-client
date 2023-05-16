
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";

const Films = () => {
    const [films, setFilms] = useState <Array<Film>>([]);
    const [filmGenres, setFilmGenres] = useState <Array<Genre>>([]);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchInput, setSearch] = useState("");
    const [genreInput, setGenre] = useState <Array<number>>([]);
    const [ageInput, setAge] = useState <Array<string>>([]);

    const [requestString, setRequestString] = useState("");

    useEffect(() => {
        GetFilms();
        GetFilmGenres();
    }, [genreInput, ageInput])


    const createRequestString = () => {
        let tempRequestString = "";
        if (genreInput.length !== 0) {
            for(let i = 0; i < genreInput.length; i++) {
                tempRequestString += "genreIds=" + genreInput[i] + '&';
            }
        }
        if (ageInput.length !== 0) {
            for(let i = 0; i < ageInput.length; i++) {
                tempRequestString += "ageRatings=" + ageInput[i].toString() + '&';
            }
        }
        if (searchInput !== "") {
            tempRequestString += 'q=' + searchInput;
        }

        return tempRequestString;
    }
    const GetFilms = () => {
        axios.get("https://seng365.csse.canterbury.ac.nz/api/v1/films?" + createRequestString())
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setFilms(response.data.films);
                }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }
    const GetFilmGenres = () => {
        axios.get('https://seng365.csse.canterbury.ac.nz/api/v1/films/genres')
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setFilmGenres(response.data);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }
    function searchFilms() {
        GetFilms();
    }
    const handleSearch = (event: string, key: boolean) => {
        if (key) {
            if(event === "Enter") {
                GetFilms();
            }
        } else {
            setSearch(event);
        }
    };

    const handleFilterGenre = (checkInput: number) => {
        let tempGenres = new Array<number>;
        tempGenres = tempGenres.concat(genreInput);
        if (tempGenres.includes(checkInput)) {
            tempGenres.splice(tempGenres.indexOf(checkInput), 1);
        } else {
            tempGenres.push(checkInput);
        }
        setGenre(tempGenres);
    };

    const handleFilterAge = (checkInput : string) => {
        let tempAges = new Array<string>;
        tempAges = tempAges.concat(ageInput);
        if (tempAges.includes(checkInput)) {
            tempAges.splice(tempAges.indexOf(checkInput), 1);
        } else {
            tempAges.push(checkInput);
        }
        setAge(tempAges);
    };

    function FilmsList() {
        if (errorFlag) {
            return (
                <div>
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div>
                </div>
            ) } else { return (films.map((value: Film) =>
                <div className="card col-3 film-card shadow" key={value.filmId}>
                    <Link to={"/films/" + value.filmId}>
                        <img src={"https://seng365.csse.canterbury.ac.nz/api/v1/films/" + value.filmId + "/image"}
                             className="card-img-top" alt="Card image cap"></img>
                    </Link>
                    <div className="card-body film-card-body">
                        <h5 className="card-title">{value.title}</h5>
                        <p className="card-text">{value.ageRating}</p>
                        <p className="card-text">Release: {value.releaseDate.toString().split('T')[0]}</p>
                        <p className="card-text">Director: {value.directorFirstName + " " + value.directorLastName}</p>
                        <p className="card-text">{value.rating + " Out of 10 from average user scores"}</p>
                    </div>
                </div>
            )
        )
        }
    }
    function getGenreContent() {
        return (filmGenres.map((genre) =>
            <div className="form-check" key={"genre"+genre.genreId}>
                <input type="checkbox" className="form-check-input" name={"genreCheck"+genre.genreId} id={"genreCheck"+genre.genreId}
                       value={genre.genreId} onClick={() => handleFilterGenre(genre.genreId)}></input>
                <label className="form-check-label" htmlFor={"genreCheck"+genre.genreId}>{genre.name}</label>
            </div>
            )
        )
    }
    function getAgeRatingContent() {
        return (["G", "PG", "M", "R13", "R16", "R18", "TBC"].map((rating) =>
                <div className="form-check" key={rating}>
                    <input type="checkbox" className="form-check-input" name={rating} id={"ageCheck"+rating}
                           value={rating} onClick={() => handleFilterAge(rating)}></input>
                    <label className="form-check-label" htmlFor={"ageCheck"+rating}>{rating}</label>
                </div>
            )
        )
    }
    return (
        <div style={{width: "100%"}}>
            <h1>Films</h1>

                <div className="row input-group search-filter">
                    <div className="col-9 search-container">
                        <div className="form-control" >
                            <input type="search" placeholder="search" id="searchInput" value={searchInput}
                                   onKeyDown={(input) => handleSearch(input.key, true)} onChange={(searchInput) => handleSearch(searchInput.target.value, false)}/>
                            <button className="search-button" onClick={searchFilms}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>

                    </div>
                </div>
            <div className="row input-group search-filter">
                    <div className="col-3 dropdown">
                        <button className="form-control dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            Genre
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {getGenreContent()}
                        </div>
                    </div>

                    <div className="col-3 dropdown">
                        <button className="form-control dropdown-toggle" type="button"
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                            Age Rating
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {getAgeRatingContent()}
                        </div>
                    </div>

                    <div className="col-3">
                        <select className="select form-control">
                            <option value="ALPHABETICAL_ASC">ALPHABETICAL_ASC</option>
                            <option value="ALPHABETICAL_DESC">ALPHABETICAL_DESC</option>
                            <option selected value="RELEASED_ASC">RELEASED_ASC</option>
                            <option value="RELEASED_DESC">RELEASED_DESC</option>
                            <option value="RATING_ASC">RATING_ASC</option>
                            <option value="RATING_DESC">RATING_DESC</option>
                        </select>
                    </div>

                </div>

                <div className="row film-cards">
                    {FilmsList()}
                </div>

            </div>
    )
}



export default Films;