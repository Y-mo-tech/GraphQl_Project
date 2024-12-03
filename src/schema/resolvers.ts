import bcrypt from 'bcryptjs'
import {User} from '../models/user'
import {generateToken, jwtPayload} from '../utils/auth';
import {createWebSocketClient} from '../clients/client'
import {Redis} from 'ioredis'

const client = new Redis() 

type GqlType = {
    id: string
    email: string
    role: string
}

export const resolvers = {
    Query :{
      getUser: async (parent: unknown, {id}: {id: string}, context: { user: jwtPayload }): Promise<GqlType> => {
        try{
           const user = await User.findById(id);

           if(!user){
            throw new Error("User not found");
           }

           return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
        } catch(error){
            if(error instanceof Error){
                throw new Error (`Error in fetching user: ${error.message}`)
            } else{
                throw new Error (`Error in fetching user`)
            }
        }
      },
      getAllUsers: async (parent: unknown, _:any, context: { user: jwtPayload }): Promise<GqlType[]> => {
        try{
           let cachedData = await client.get('users')
           if(cachedData){
            console.log("Cached Data is present")
            return JSON.parse(cachedData)
           }

           const users = await User.find({});

           if(!users){
            throw new Error("Users not found");
           }
           
            let usersUpdated = users.map(user => ({
               id: user._id.toString(),
               email: user.email,
               role: user.role,
            }));

            client.set('users', JSON.stringify(usersUpdated))

            return usersUpdated;

        } catch(error){
            if(error instanceof Error){
                throw new Error (`Error in fetching users: ${error.message}`)
            } else{
                throw new Error (`Error in fetching user`)
            }
        }
      }
    },
    Mutation: {
        registerUser: async (parent: unknown, { email, password, role }: { email: string; password: string; role: string }): Promise<String> => {
            try{
                const userExist = await User.findOne({email})

                if(userExist){
                    throw new Error("User already exists !!")
                }
                
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    email,
                    password: hashedPassword,
                    role,
                });
                await newUser.save();
    
                return "User registered successfully";
            } catch(error){
                if(error instanceof Error){
                    throw new Error (`Registration failed: ${error.message}`)
                } else{
                    throw new Error (`Registration failed`)
                }
            }    
        },
        login: async (parent: unknown, {email, password}: {email: string; password: string;}): Promise<string> => {
            try{
                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error("User not found");
                }

                const passwordMatch = await bcrypt.compare(password, user.password)

                if (!passwordMatch) {
                    throw new Error("Invalid credentials");
                }

                let jwtToken = generateToken(user.email, user.role)

                const socketClient = createWebSocketClient(jwtToken);

                return jwtToken

            }catch(error){
                if(error instanceof Error){
                    throw new Error (`Login failed: ${error.message}`)
                } else{
                    throw new Error (`Login failed`)
                }
            }
        }
    }
}

