import {model, models, Schema} from 'mongoose'

const budgetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users", 
        required: true ,
    },
    category: {
        type: String,
        required: true
    },
    spend: {
        type: Number,
        required: true
    },
    theme: {
        type: String,
        required: true
    }
})

const budget = models.budget || model("budget", budgetSchema)
export default budget;