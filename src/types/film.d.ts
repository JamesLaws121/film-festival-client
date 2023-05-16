type Film = {
    /**
     * Film as defined by the database
     */
    filmId: number,
    title : string,
    description : string,
    release_date : Date,
    image_filename : string,
    runtime : number,
    director_id : number,
    genre_id : number,
    age_rating : string,
}

type FilmReview = {
    /**
     * Film as defined by the database
     */
    id: number,
    film_id : number,
    user_id : number,
    rating : number,
    review : string,
    timestamp : Date,
}

type Genre = {
    /**
     * Genre as defined by the database
     */
    genreId: number,
    name : string,
}