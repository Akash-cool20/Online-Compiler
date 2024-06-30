import { Code, Copy, Loader, Save, Share2 } from "lucide-react";
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
