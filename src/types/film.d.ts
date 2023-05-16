type Film = {
    /**
     * Film as defined by the Get Film
     */
    filmId: number,
    title : string,
    releaseDate : Date,
    imageFilename : string,
    runtime : number,
    directorId : number,
    genreId : number,
    ageRating : string,
    directorFirstName: string,
    directorLastName: string,
    rating: string;

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