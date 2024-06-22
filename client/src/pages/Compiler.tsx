
import CodeEditor from "../components/CodeEditor";
import HelperHeader from "../components/HelperHeader";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export default function Compiler() {


  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className=" h-[calc(100dvh-60px)] min-w-[350px] " defaultSize={50} >
        <HelperHeader/>
        <CodeEditor/>

      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className=" h-[calc(100dvh-60px)] min-w-[350px] p-6" defaultSize={50}>
         right side
          
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}
