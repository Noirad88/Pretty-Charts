'use client'

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const data_sheet = require('./test_data.json');
const data_sheet_values = data_sheet.map((entry)=>{
  return entry["Value"] 
})

const data_sheet_dates = data_sheet.map((entry)=>{
  return entry["Date"] 
})

const nums_max = Math.max.apply(null, data_sheet_values)
const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl quis elit pulvinar pharetra nec ac eros. Aliquam ut augue elementum, ultrices tortor vitae, dignissim libero."

function MainGrid({children}) {
  return(
    <div className="flex flex-row justify-center">
      <div className="grid md:grid-cols-12 grid-cols-4 place-content-center md:max-w-[1200px] w-full gap-x-16 gap-y-32 py-32 md:mx-16 mx-8">
      {children}
    </div>
  </div>
  )
}

function InnerSection(props){
  return (
    <div className={`${props.className} flex flex-col items-start gap-4 h-full`}>
      {props.children}
    </div>
  )
}


function ChartTip(props){
  return (
    <div  className={`tooltip ${props.className}`}>
        <p className="z-[10] text-sm text-slate-800 w-full text-center"><b>{props.children}</b></p>
    </div>
  )
}

function ChartCol(props){
  const [on_hover,set_on_hover] = useState("hidden")
  const [color_bar_height,set_color_bar_height] = useState(0)
  const bar_parent = useRef(null)
  const col_scale = props.col_scale
  const col_width = props.col_width
  const col_style = {
      'height': col_scale * props.height + "px",
      'maxHeight': col_scale * props.height + "px"
  }

  useEffect(()=>{
    set_color_bar_height(bar_parent.current.parentElement.clientHeight)
  })

  return (
    <div ref={bar_parent} style={col_style} onMouseOver={() => {set_on_hover(true)}} onMouseLeave={() => {set_on_hover(false)}} className="basis-10 shrink-0 grow-0 relative flex flex-col items-center justify-end w-full gap-2">

        <div style={{width: col_width + "px"}} className="flex relative flex-col items-center rounded-t-lg justify-end overflow-hidden h-full">
          <div style={{height: color_bar_height + "px", width: col_width + "px"}} className={`absolute bg-gradient-to-b ${on_hover == true ? "from-fuchsia-300 via-blue-300 to-emerald-300" : "from-fuchsia-500 via-blue-500 to-emerald-400"} border-b-black flex flex-col items-center border-b border-solid transition-all duration-300`}>
          </div>
        </div>
        
        <ChartTip className={on_hover == true ? "opacity-100 top-[-48px]" : "opacity-0 top-[-32px]"}>
          {props.height}
        </ChartTip>
        <p className={`absolute bottom-[-24px] text-xs text-center w-full`}>{props.date}</p>
    </div>
  )
}

function Chart(props){

  let data_v_nums = [
    <div className="text-xs">{0}</div>,
    <div className="text-xs">{(nums_max/2).toFixed(1)}</div>,
    <div className="text-xs">{+(nums_max).toFixed(1)}</div>]

  const data_cols = data_sheet.map((entry, index)=>{
    return <ChartCol col_scale={props.col_scale} col_width={props.col_width} key={entry} date={entry["Date"]} height={entry["Value"]} index={index}/>
  })

  let num_list = []
  for (let i = 0; i < data_sheet_dates.length; i++){
    num_list.push(<div className="text-xs w-full">{data_sheet_dates[i]}</div>)
  }

  return (
    <div className="relative flex flex-col">
      <div className="absolute z-[10] l-0 h-full py-14">
        <div className="flex flex-col h-full justify-between border-r border-r-neutral-400 pr-2 bg-background">
          {data_v_nums.reverse()}
        </div>
      </div>
      <div className="relative flex flex-row no-scrollbar overflow-x-scroll items-end overflow-y-hidden ml-8">
        <div className="border-b border-b-neutral-400 my-14"/>
        <div className="grow w-full flex flex-row justify-start items-end my-14">
            {data_cols}
        </div>
      </div>
    </div>
  )
}

function BigNum(props){
  return (
    <div className={`${props.className} flex flex-col justify-center items-center border border-solid border-8 bg-transparent text-center`}>
      {props.children}
    </div>
  )
}

function HeadingChip(){
  return (
    <div className="bg-foreground w-[100px] h-[8px]"/>
  )
}


export default function Home() {

  return (
    <MainGrid>
        <div className="md:col-span-6 col-span-full">
          <InnerSection>
            <HeadingChip/>
            <h1>A date with data.</h1>
          </InnerSection>
        </div>
        <div className="md:col-span-6 col-span-full">
          <InnerSection className="justify-start">
            <p>{lorem_ipsum + " " + lorem_ipsum}</p>
          </InnerSection>
        </div>
        
        <div className="col-span-full">
          <Chart col_scale="8" col_width="4"/>
        </div>

        <div className="md:col-span-6 col-span-full">
          <Chart col_scale="8" col_width="34"/>
        </div>
        <div className="md:col-span-6 col-span-full">
          <Chart col_scale="8" col_width="16"/>
        </div>
  
        <div className="md:col-span-full col-span-full">
            <Chart col_scale="8" col_width="120"/>
        </div>

        <div className="md:col-span-full col-span-full">
          <InnerSection className="items-center text-center">
            <h2>Thanks for looking!</h2>
            <p>You should look at everything else I do</p>
            <Link className = "bg-primary rounded-md p-4 text-black font-bold" href="https://darionmccoy.com">Learn more about me</Link>
          </InnerSection>
        </div>

    </MainGrid>
  );
}
