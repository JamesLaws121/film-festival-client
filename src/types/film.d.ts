type Film = {
    /**
     * Film as defined by the Get Films
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

type IndividualFilm = {
    /**
     * Film as defined by the Get Film
     */
    filmId: number,
    title : string,
    releaseDate : Date,
    runtime : number,
    directorId : number,
    genreId : number,
    ageRating : string,
    directorFirstName: string,
    directorLastName: string,
    rating: string;
    "description": string,
    "numReviews": string,
}

type FilmReview = {
    /**
     * Film review as defined by get film review
     */
    reviewerId: number,
    rating : string,
    review : string,
    timestamp : Date,
    reviewerFirstName: string,
    reviewerLastName: string,
}

type Genre = {
    /**
     * Genre as defined by the database
     */
    genreId: number,
    name : string,
}