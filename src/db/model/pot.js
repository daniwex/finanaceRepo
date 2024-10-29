import { Schema, model, models } from "mongoose";


const potSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    potTitle:{
        type: String,
        required: true
    },
    potAmount:{
        type: Number,
        required: true
    },
    potTheme:{
        type: String,
        required: true
    },
    potSavings: {
        type:Number,
        default:() => 5,
    }
})

const pot = models.pot || model("pot", potSchema)
export default pot;