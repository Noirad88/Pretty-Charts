'use client'

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const data_sheet = require('./test_data.json');
const data_sheet_small = require('./test_data_small.json');

const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl quis elit pulvinar pharetra nec ac eros. Aliquam ut augue elementum, ultrices tortor vitae, dignissim libero."

function MainGrid({children}) {
  return(
    <div className="flex flex-row justify-center">
      <div className="grid md:grid-cols-12 grid-cols-4 md:max-w-[1200px] w-full gap-x-16 gap-y-32 py-32 md:mx-16 mx-8 overflow-hidden">
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
    <div ref={bar_parent} style={col_style} onMouseOver={() => {set_on_hover(true)}} onMouseLeave={() => {set_on_hover(false)}} className={`${props.fixed_width == true ? "basis-10 shrink-0 grow-0" : "grow"} relative flex flex-col items-center justify-end w-full gap-2`}>
        <div className="hidden basis-10 shrink-0 grow-0 grow"/>
        <div style={{width: col_width + "px"}} className={`flex relative flex-col items-center rounded-t-lg justify-end overflow-hidden h-full bg-white`}>
          <div style={{height: color_bar_height + "px", width: col_width + "px"}} className={`absolute bg-gradient-to-b ${on_hover == true ? "opacity-25" : "opacity-100"} ${props.gradient} border-b-black flex flex-col items-center border-b border-solid transition-opacity transition-bg duration-300`}>
          </div>
        </div>
        
        <ChartTip className={on_hover == true ? "opacity-100 top-[-48px]" : "opacity-0 top-[-32px]"}>
          {props.height}
        </ChartTip>
        <p className={`absolute bottom-[-24px] text-xs text-center w-full`}>{props.date}</p>
    </div>
  )
}

function ScrollIndicatorContainer(props){
  return(
    <div className={`${props.className} pointer-events-none absolute z-[10] flex flex-row w-full h-full justify-between items-center px-16 transition-all`}>
      <ScrollIndicator>
        0
      </ScrollIndicator>
      <ScrollIndicator>
        1
      </ScrollIndicator>
    </div>
  )
}

function ScrollIndicator({children}){
  return (
    <div className="flex flex-row bg-white place-content-center size-[32px] p-2 rounded-full drop-shadow-md"><p className="text-black text-xs w-full h-full text-center">{children}</p></div>
  )
}

ChartCol.defaultProps = {
  fixed_width: false,
  gradient: "from-fuchsia-500 via-blue-500 to-emerald-400"
}

function Chart(props){
  const [on_hover,set_on_hover] = useState("hidden")
  
  console.log(props.scrollable)

  const data_sheet_values = props.chart_json.map((entry)=>{
    return entry["Value"] 
  })
  
  const data_sheet_dates = props.chart_json.map((entry)=>{
    return entry["Date"] 
  })
  
  const nums_max = Math.max.apply(null, data_sheet_values)

  let data_v_nums = [
    <div className="text-xs">{0}</div>,
    <div className="text-xs">{(nums_max/2).toFixed(1)}</div>,
    <div className="text-xs">{+(nums_max).toFixed(1)}</div>
  ]

  const data_cols = props.chart_json.map((entry, index)=>{
    return <ChartCol gradient={props.gradient} fixed_width={props.scrollable} col_scale={props.col_scale} col_width={props.col_width} key={entry} date={entry["Date"]} height={entry["Value"]} index={index}/>
  })

  let num_list = []
  for (let i = 0; i < data_sheet_dates.length; i++){
    num_list.push(<div className="text-xs w-full">{data_sheet_dates[i]}</div>)
  }

  return (
    <div onMouseOver={()=>set_on_hover(true)} onMouseLeave={()=>set_on_hover(false)} className="relative flex flex-col">
      <div className="absolute z-[10] l-0 h-full py-14">
        <div className="flex flex-col h-full justify-between border-r border-r-neutral-400 pr-2 bg-background">
          {data_v_nums.reverse()}
        </div>
      </div>
      <div className="relative flex flex-row no-scrollbar overflow-x-scroll items-end overflow-y-hidden ml-8">
        <div className="border-b border-b-neutral-400 my-14"/>
        <div className="grow w-full flex flex-row justify-start gap-x-[4px] items-end my-14">
            {data_cols}
        </div>
      </div>
      {(()=>{
        if (props.scrollable == true){
          return <ScrollIndicatorContainer className={on_hover == true ? "opacity-100" : "opacity-0"}/>
        }
      })()}
    </div>
  )
}

Chart.defaultProps = {
  scrollable: false,
}

function HeadingChip(){
  return (
    <div className="bg-gradient-to-l from-fuchsia-500 via-blue-500 to-emerald-400 w-[100px] h-[8px]"/>
  )
}

function BigButton(props){
  return(
    <Link className = "hover:bg-primary bg-background rounded-md p-4 hover:text-black text-primary font-bold  border-4 border-solid border-primary transition-all" href={props.href}>{props.children}</Link>
  )
}

function Caption(props){
  return(
    <div className="w-full flex flex-row justify-center"><p className="inline font-semibold text-xs text-center bg-slate-800 p-2 rounded-md text-white">{props.children}</p></div>
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
            <Chart chart_json={data_sheet_small} scrollable={false} col_scale="8" col_width="8"/>
            <Caption>Responsive columns</Caption>
        </div>

        <div className="col-span-full">
          <Chart chart_json={data_sheet} scrollable={true} col_scale="8" col_width="4"/>
          <Caption>Fixed columns, with scrollable container + indicators</Caption>
        </div>

        <div className="md:col-span-6 col-span-full">
          <Chart chart_json={data_sheet} scrollable={true} col_scale="16" col_width="4"/>
          <Caption>Adjustable chart height</Caption>
        </div>
        <div className="md:col-span-6 col-span-full">
          <Chart chart_json={data_sheet} scrollable={true} col_scale="16" col_width="32"/>
          <Caption>Adjustable column width</Caption>
        </div>


        <div className="col-span-full">
            <Chart chart_json={data_sheet} gradient="from-red-500 via-pink-500 to-yellow-400" scrollable={true} col_scale="8" col_width="120"/>
            <Caption>Adjustable gradient</Caption>
        </div>

        <div className="col-span-full">
          <InnerSection className="items-center text-center">
            <h2>Thanks for looking! If you use these, just let me know on Twitter or somewhere else.</h2>
            <p>You should look at everything else I do</p>
            <BigButton href="https://darionmccoy.com">Learn more about me</BigButton>
          </InnerSection>
        </div>

    </MainGrid>
  );
}
