import mongoose from "mongoose";

interface ICodeScheama{
    fullCode:{
        html:string,
        css:string,
        javascript:string
    }
}

const CodeSchema = new mongoose.Schema<ICodeScheama>({
    fullCode:{
        html:String,
        css:String,
        javascript:String
    },
});
export const Code = mongoose.model("Code",CodeSchema);