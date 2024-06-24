import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from '@lezer/highlight';
import {  draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCodeValue } from "@/redux/slices/complierSlice";




export default function CodeEditor() {
  const currentLanguage = useSelector( (state: RootState)=> state.complierSlice.currentLanguage);
  const dispath = useDispatch();

  const fullCode = useSelector((state: RootState) => state.complierSlice.fullCode);
  
  const onChange = React.useCallback((value: string) => {
    // console.log("val:", val);
    // setValue(val);
    dispath(updateCodeValue(value))
  }, []);

  // loadLanguage('tsx');

  return  <CodeMirror
    value={fullCode[currentLanguage]}
    height="calc(100vh - 60px - 50px)"
    extensions={[loadLanguage(currentLanguage)!]}
    onChange={onChange}
    theme={draculaInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'monospace',
        },
        styles: [
          { tag: t.comment, color: '#6272a4' },
        ]
      })}
  />;
}
