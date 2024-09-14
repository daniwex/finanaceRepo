import {model, models, Schema} from 'mongoose'

const userSchema = new Schema({
    email: {
        type:String,
        required: [true, "email is required"],
        matches: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type:String,
        required: [true, "password is required"],
    }
})

const user = models.users || model("users", userSchema)
export default user;