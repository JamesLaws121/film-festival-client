
import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import defaultImage from "../static/john-travolta.gif";

const Films = () => {
    const [films, setFilms] = useState <Array<Film>>([]);
    const [filmGenres, setFilmGenres] = useState <Array<Genre>>([]);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchInput, setSearch] = useState("");
    const [genreInput, setGenre] = useState <Array<number>>([]);
    const [ageInput, setAge] = useState <Array<string>>([]);
    const [sortOrder, setSortOrder] = useState("RELEASED_ASC");
    const [size] = useState(8);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);



    const createRequestString = useCallback(() => {
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
            tempRequestString += 'q=' + searchInput + '&';
        }
        tempRequestString += "sortBy=" + sortOrder;

        return tempRequestString;
    }, [ageInput, genreInput, searchInput, sortOrder])

    const GetFilms = useCallback(() => {
        axios.get("http://localhost:4941/api/v1/films?" + createRequestString())
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setFilms(response.data.films);
                setTotalPages(Math.ceil((response.data.count)/size));
                setPage(0);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }, [createRequestString, size])

    useEffect(() => {
        GetFilms();
        GetFilmGenres();

    }, [genreInput, ageInput, sortOrder, GetFilms])


    const GetFilmGenres = () => {
        axios.get('http://localhost:4941/api/v1/films/genres')
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
        let tempGenres = new Array<number>();
        tempGenres = tempGenres.concat(genreInput);
        if (tempGenres.includes(checkInput)) {
            tempGenres.splice(tempGenres.indexOf(checkInput), 1);
        } else {
            tempGenres.push(checkInput);
        }
        setGenre(tempGenres);
    };

    const handleFilterAge = (checkInput : string) => {
        let tempAges = new Array<string>();
        tempAges = tempAges.concat(ageInput);
        if (tempAges.includes(checkInput)) {
            tempAges.splice(tempAges.indexOf(checkInput), 1);
        } else {
            tempAges.push(checkInput);
        }
        setAge(tempAges);
    };

    const handleSortOrder = (input: string) => {
        setSortOrder(input);
    }


    function FilmsList() {
        if (errorFlag) {
            return (
                <div>
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div>
                </div>
            ) } else {

            let paginatedFilms = films.slice(page*size, (page*size)+size);

            return paginatedFilms.map((value: Film) =>
                <div className="card col-2 film-card shadow" key={value.filmId}>
                    <img src={"http://localhost:4941/api/v1/films/" + value.filmId + "/image"} alt="Error"
                         className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>
                    <div className="card-body film-card-body">
                        <h5 className="card-title">{value.title}</h5>
                        <p className="card-text">{"Rating: " + value.ageRating}</p>
                        <p className="card-text">{"Genre: " + filmGenres.find(element => element.genreId === value.genreId)?.name}</p>
                        <p className="card-text">Release: {value.releaseDate.toString().split('T')[0]}</p>
                        <h2 className="card-text">{parseFloat(value.rating)*10 + "%"}</h2>
                        <div className="director-values">
                            <img src={"http://localhost:4941/api/v1/users/" + value.directorId + "/image"} alt="Error"
                                 className="director-image" onError={(target) => target.currentTarget.src = defaultImage}></img>
                            <p className="card-text">Director: {value.directorFirstName + " " + value.directorLastName}</p>
                        </div>

                    </div>
                    <a href={"/film?id=" + value.filmId} className="stretched-link"> </a>
                </div>
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

    function getPaginationButtons() {
        let pageNumbers = Array.from({length: totalPages}, (x, i) => i);
        return (pageNumbers.map((pageNumber) =>
                    <div key={"pagination"+pageNumber}>
                        <li className={"page-item" + (pageNumber === page ? " active" : "")}>
                            <button className="page-link" onClick={()=>setPage(pageNumber)}>{pageNumber+1}</button></li>
                    </div>
            )
        )
    }
    return (
        <div style={{width: "100%"}}>
            <h1>Films</h1>
            <div className="search-filter">

                <div className="row input-group search-filter-content">
                    <div className="col-9 search-container">
                        <div className="form-control" >
                            <input type="search" placeholder="search" id="searchInput" value={searchInput}
                                   onKeyDown={(input) => handleSearch(input.key, true)}
                                   onChange={(searchInput) => handleSearch(searchInput.target.value, false)}/>
                            <button className="search-button" onClick={searchFilms}>
                                <i className="bi bi-search"></i>
                            </button>
                        </div>

                    </div>
                </div>
                <div className="row input-group search-filter-content">
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
                        <select className="select form-control" onChange={e => handleSortOrder(e.target.value)} defaultValue={"RELEASED_ASC"}>
                            <option value="RELEASED_ASC">Released Ascending</option>
                            <option value="RELEASED_DESC">Released Descending</option>
                            <option value="ALPHABETICAL_ASC">Alphabetical Ascending</option>
                            <option value="ALPHABETICAL_DESC">Alphabetical Descending</option>
                            <option value="RATING_ASC">Rating Ascending</option>
                            <option value="RATING_DESC">Rating Descending</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row film-cards">
                {FilmsList()}
            </div>


            <nav>
                <ul className="pagination">
                    <li className="page-item"><button className="page-link" onClick={()=>setPage(0)}>First</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>setPage(page > 0 ? page-1 : page)}>Previous</button></li>
                    {getPaginationButtons()}
                    <li className="page-item" ><button className="page-link" onClick={()=>setPage(page+1 < totalPages ? page+1 : page)}>Next</button></li>
                    <li className="page-item"><button className="page-link" onClick={()=>setPage(totalPages-1)}>Last</button></li>
                </ul>
            </nav>

        </div>
    )
}



export default Films;