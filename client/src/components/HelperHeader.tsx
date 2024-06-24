import { Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {  CompilerSliceStateType,  updateCurrentLanguage,} from "@/redux/slices/complierSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import axios from "axios";

export default function HelperHeader() {

  const dispath = useDispatch();
  const fullCode = useSelector((state:RootState)=>state.complierSlice.fullCode)
  const handleSaveCode = async ()=>{
    try {
      const response = await axios.post("http://localhost:4000/compiler/save",{
        fullCode:fullCode,
      })
      console.log(response.data);
    } catch (error) {
      handleError(error)
    }
  }

  const currentLanguage = useSelector(
    (state: RootState) => state.complierSlice.currentLanguage
  );
  
  return (
  
  <div className="__helper_header h-[50x] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Button
          onClick={handleSaveCode}
          variant="success"
          className="flex justify-center items-center gap-2"
        >
          {" "}
          <Save size={14} /> Save{" "}
        </Button>
        <Button
          variant="success"
          className="flex justify-center items-center gap-2"
        >
          <Share2 size={16} />
          Share
        </Button>
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        Current Langauge:
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispath(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
