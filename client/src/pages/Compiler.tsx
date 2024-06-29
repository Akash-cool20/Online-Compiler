
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import RenderCode from "@/components/RenderCode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { updateFullCode } from "@/redux/slices/complierSlice";
import { handleError } from "@/utils/handleError";
import { toast } from "sonner";
import { useLoadCodeMutation } from "@/redux/slices/api";
import Loader from "@/components/Loader/Loader";


export default function Compiler() {
  const {urlId} = useParams();
  const [loadExistingCode,{isLoading}]=useLoadCodeMutation();
  const dispath =  useDispatch(); 
  const loadCode = async ()=>{
    try {
      if(urlId){
        const response = await loadExistingCode({urlId}).unwrap();
        dispath(updateFullCode(response.fullCode));
      }
      
    } catch (error) {
        handleError(error);
    }
  }
  useEffect(()=>{
    if(urlId){
      loadCode();
    }
  },[urlId])
  if(isLoading) 
      return (
        <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          <Loader/>
        </div>
      )
  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className=" h-[calc(100dvh-60px)] min-w-[350px] " defaultSize={50} >
        <HelperHeader/>
        <CodeEditor/>

      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className=" h-[calc(100dvh-60px)] min-w-[350px] " defaultSize={50}>
        <RenderCode/> 
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}
