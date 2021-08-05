const db= require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const bcrypt =require("bcrypt")
const { BCRYPT_WORK_FACTOR } =require("../config")

class User{
    static makePublicUser(user){
        return{
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            zip_code: user.zip_code,
            profile_pic : user.profile_pic
            
        }
    }


    static async login(credentials){
        //user submits email and password 
        //if any fields missing throw error
        const requiredFields = ["email", "password"]
        requiredFields.forEach(field =>{
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
        //lookup user in db by email
        const user = await User.fetchUserByEmail(credentials.email)
        //if found compare passwords
        //if match return user
        //if wrong, throw error
        if (user){
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid){
                return User.makePublicUser(user)
            }
        }

        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials){
        //user submits email and password
        //if fields missing throw an error
        const requiredFields = ["email","username","zip_code","first_name","last_name", "age", "password"]
        requiredFields.forEach(field =>{
            
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
        //Make sure email is entered in 
        if (credentials.email.indexOf("@") <=0){
            throw new BadRequestError("Please enter a valid email")
        }

        
        //Make sure username is not an empty string
        if(credentials.username===""){
            throw new BadRequestError("Please enter a valid username")
        }
        if(credentials.first_name===""){
            throw new BadRequestError("Please enter your first name")
        }

        if(credentials.last_name===""){
            throw new BadRequestError("Please enter your last name")
        }
        
        if(credentials.age===0){
            throw new BadRequestError("Please enter your corect age")
        }else if (credentials.age==="") {
            throw new BadRequestError("Please enter a number for your age")
        } 
            
       if(credentials.zip_code===""){
           throw new BadRequestError("Please enter a valid zip code")
       }
       if(credentials.password===""){
           throw new BadRequestError("Please enter a valid password")
       }


        // make sure unique email
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser){
            throw new BadRequestError(`The email "${credentials.email}" has already been registered. Please log in or enter a new email`)
        }
        const existingUsername = await User.fetchUserByUsername(credentials.username)
        if(existingUsername){
            throw new BadRequestError(`The username "${credentials.username}" is already been taken try another one`)
        }
        //take users password and hash it
        //take users email and lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()
        const hashedPw = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        const normalizedUsername = credentials.username.toLowerCase()
        // create a new user in db with their info
        const result = await db.query(
           ` INSERT INTO users (
                email, username, zip_code, first_name, last_name, age, password
            )VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, email, username, zip_code, first_name, last_name, age, password, is_admin;`, [lowercasedEmail, normalizedUsername, credentials.zip_code,
            credentials.first_name, credentials.last_name, credentials.age, hashedPw])
        //return user
        const user = result.rows[0]
        return User.makePublicUser(user)
    }

    static async fetchUserByEmail(email){
        if(!email){
            throw new BadRequestError("No email provided")
        }
        const query =`SELECT * FROM users WHERE email =$1`
        const result = await db.query(query, [email.toLowerCase()])
        const user = result.rows[0]
        return user
    }
    static async fetchUserByUsername(username){
        if(!username){
            throw new BadRequestError("No username provided")
        }
        const query =`SELECT * FROM users WHERE username =$1`
        const result = await db.query(query, [username])
        const user = result.rows[0]
        return user
    }
}

module.exports = User