import http from 'http'
import { Server as SocketIOSever} from 'socket.io';
import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import {connectDB} from './config/db'
import {typeDefs} from './schema/typeDefs'
import {resolvers} from './schema/resolvers'
import {auth} from './utils/auth'
const PORT = 8000;

connectDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const token = req.headers.authorization || '';
        let user = null;
        //console.log("req.body.operationName====", req.body.operationName)
        if(req.body.operationName === 'getUser' || req.body.operationName === 'getAllUsers'){
            console.log("req.body.operationName====", req.body.operationName)
            try {
                if(!token){
                    throw new Error("Token Missing !!")
                }
                user = auth(token);
            } catch (error) {
                console.error('Auth Error:', error);
                throw new Error('Authentication failed');
            }
        }
        return {user}
    }
})

const startServer = async (): Promise<void> => {
    try{
        const app = express()
        const httpServer = http.createServer(app)
        await server.start()
        server.applyMiddleware({ app: app as any })

        const io = new SocketIOSever(httpServer)

        serverConnection(io)

        app.use(express.json())
        app.use('/graphql', (req, res, next)=>{
            //let authRoutes = ['getUser', 'getAllUSers'];
            
            next()
        })
        
        httpServer.listen(PORT, ()=> {console.log(`Server running on port ${PORT}`)})
    } catch(error){
        console.log('Some error occured while connecting server!')
        if(error instanceof Error){
            throw new Error (`Server error: ${error.message}`)
        } else{
            throw new Error (`Server error`)
        }
    }
    
}

startServer()

const serverConnection = (io: any) => {
    console.log("Inside server connection")
    io.use((socket: any, next: any) => {
       const token = socket.handshake.auth.token;
       //console.log("=== token inside server connection =====", token)
       if (!token) {
           return next(new Error('Authentication error'));
       }
   
       try {
           const payload = auth(token)

           //console.log("payload====---", payload)
           socket.data.user = payload;
           next();
       } catch (err) {
           next(new Error('Authentication error'));
       }
    });

    io.on('connection', (socket: any) => {
        const user = socket.data.user;
        //console.log("user====---", user)
        console.log(`User connected: ${user.email}, Role: ${user.role}`);
    
        socket.join(user.role);
    
        io.to(user.role).emit("userJoined", {
            message: `A new user has joined the room: ${user.role}`,
            user: { email: user.email, role: user.role },
        });
    
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${user.email}`);
        });
    });

    io.on('error', (error: Error)=>{
        console.log("Server connection error==", error)
    })
    

}


