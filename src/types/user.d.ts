type User = {
    /**
     * User as defined by the database
     */
    id: number,
    first_name : string,
    last_name : string,
    email : string,
    password : string,
    image_filename : string,
}

type UserAuthentication = {
    /**
     * Authentication as defined by log in
     */
    id: number,
    token : string,
}

