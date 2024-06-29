import mongoose from 'mongoose';

interface iUserSchema{
    username:string,
    password:string,
    email:string,
    picture:string,
    savedCodes:Array<mongoose.Types.ObjectId>
}

const UserSchema = new mongoose.Schema<iUserSchema>(
    {
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      picture: {
        type: String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
      },
      savedCodes:[{ type: mongoose.Schema.Types.ObjectId }],
    },
    { timestamps: true }
  );
  
  export const User = mongoose.model("User", UserSchema);
