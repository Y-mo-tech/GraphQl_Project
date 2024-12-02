import mongoose from 'mongoose'

export interface IUser {
    email: string,
    password: string,
    role: string
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
       type: String,
       required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

export const User = mongoose.model<IUser>("User", userSchema);
