import { model, Schema, Types } from "mongoose";



const verifyResetTokenSchema = new Schema({
    _userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    token: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now(),
        expires: 900
    }
});

const VerifyResetToken = model("VerifyResetToekn", verifyResetTokenSchema)

export default VerifyResetToken;