import { Code, Copy, Download, Loader, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import {  CompilerSliceStateType,  updateCurrentLanguage,} from "@/redux/slices/complierSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSaveCodeMutation } from "@/redux/slices/api";

export default function HelperHeader() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const { urlId } = useParams();

  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);

  const [saveCode, {isLoading}] = useSaveCodeMutation();
  const fullCode = useSelector(
    (state: RootState) => state.complierSlice.fullCode
  );

  const handlerDownloadCode =()=>{
    if(fullCode.html === "" && fullCode.css === "" && fullCode.javascript === ""){
      toast("Error : Code is Empty");
    }else{
      const htmlCode = new Blob([fullCode.html],{type:"text/html"});
      const cssCode = new Blob([fullCode.css],{type:"text/css"});
      const javascriptCode = new Blob([fullCode.javascript],{type:"text/javascript"});
    

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href=URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href=URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href=URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      

      if(fullCode.html !== ""){
        htmlLink.click();
      }
      if(fullCode.css !== ""){
        cssLink.click();
      }
      if(fullCode.javascript !== ""){
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast("Code Downloaded Successfully");
    }
  }

  const handleSaveCode = async () => {
    try {
      const response = await saveCode(fullCode).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } 
  };

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
          disabled={isLoading}
          size="icon"
        >
          {
            isLoading ? (<><Loader /></>) : (
              <>
                <Save size={14}/>
              </>
            
            )
          }
        </Button>
          <Button onClick={handlerDownloadCode} variant="blue" size="icon">
            <Download size={14} />
          </Button>
        {shareBtn && (
          <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="success">
                <Share2 size={16} />
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Code />
                  Share your code
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <div className="__url flex gap-1">
                    <input
                      type="text"
                      disabled
                      className="w-full px-2 py-2 rounded bg-slate-800 text-white"
                      value={window.location.href}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL Copied to your clipboard");
                      }}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                  <p className="text-center">
                    Share this URL with your freinds to collaborate.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
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
