import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    addressLine1?: string;
    city?: string;
    country: string;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        
    },
    addressLine1:{
        type:String,
    },
    city:{
        type: String,
    },
    country:{
        type: String,
        default: 'India',
        immutable: true,
    },

});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
