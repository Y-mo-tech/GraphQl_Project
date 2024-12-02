import jwt from 'jsonwebtoken'
const secret = "Yunus@123c"

export interface jwtPayload {
    email: string,
    role: string
}

export const generateToken = (email: string, role: string): string => {
   try{
    const token = jwt.sign({email, role}, secret, {expiresIn: '2h'})

    return token
   } catch(error){
    if (error instanceof Error) {
        return `Some error occured: ${error.message}`;
    } else {
        return "An unexpected error occurred";
    }
   }
}

export const auth = (token: string): jwtPayload | null => {
    try{
        let decoded = null
        decoded = jwt.verify(token, secret) as jwtPayload
        return decoded;
        

    //    jwt.verify(token as string, secret, (error, decoded): any => {
    //       if(error){
    //         if(error.name == "TokenExpiredError"){
    //             throw new Error("Token expired !")
    //         } else if(error.name === 'JsonWebTokenError'){
    //             throw new Error (" Token doesn't match")
    //         }
            
    //       }

    //       if(decoded as jwtPayload){
    //         console.log("decoded----------=====", decoded)
    //         return decoded;
    //       }
    //    })

    } catch(error){
        if (error instanceof Error) {
            console.log("error of auth fxn===>", error.message)
            throw new Error(`${error.message}`)
        } else {
            throw new Error('Some error occuered in jwt !!')
        }
    }
}