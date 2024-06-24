import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

function RenderCode() {
    const fullCode = useSelector(
        (state: RootState)=> state.complierSlice.fullCode 
    );
   
    const combineCode = `
        <html>
            <style>
                ${fullCode.css}
            </style>
            <body>
                ${fullCode.html}
            </body>
            <script>
                ${fullCode.javascript}
            </script>
        </html>
    `
    const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(combineCode)}`

  return (
    <div className=' bg-gray-300 h-[calc(100dvh-60px)]'>
        <iframe className='w-full h-full' src={iframeCode}></iframe>
    </div>
  )
}

export default RenderCode