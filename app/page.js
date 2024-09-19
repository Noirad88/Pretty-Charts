'use client'

import my_image from "/public/jakayla-toney-I8I7Ektzx-c-unsplash.jpg"
import {useFormStatus} from "react-dom";
import { useState } from "react";
const data_sheet = require('./test_data.json');
const data_sheet_values = data_sheet.map((entry)=>{
  return entry["Value"] 
})

const data_sheet_dates = data_sheet.map((entry)=>{
  return entry["Date"] 
})

const nums_min = Math.min.apply(null, data_sheet_values)
const nums_max = Math.max.apply(null, data_sheet_values)
const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl quis elit pulvinar pharetra nec ac eros. Aliquam ut augue elementum, ultrices tortor vitae, dignissim libero."

function MainGrid({children}) {
  return(
    <div className="flex flex-row justify-center">
      <div className="grid grid-cols-12 place-content-center max-w-[1200px] w-full gap-16 md:mx-16 mx-8">
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

function Spacer(){
  return (
    <div className="my-2"/>
  )
}

function UiImage(props){
  return (
    <div className={`${props.className} w-full aspect-square bg-cover bg-center`} style={{ backgroundImage: `url(${my_image.src})`}}/>
  )
}


function ContactForm(){

  async function GetData(){

  }

  return (
    <form className="w-full grid grid-cols-6 gap-4" action={GetData()}>
      <label className="col-span-3" >
        <p>First Name</p>
        <input type="text" id="firstName" name="firstName"/>
      </label>
      <label className="col-span-3" >
        <p>Last Name</p>
        <input type="text" id="lastName" name="lastName"/>
      </label>
      <label className="col-span-full" >
        <p>Address Line 1</p>
        <input type="text" id="addressLine1" name="addressLine1"/>
      </label>
      <label className="col-span-full" >
        <p>Address Line 2</p>
        <input type="text" id="addressLine2" name="addressLine2"/>
      </label>
      <div className="col-span-full flex flex-row gap-2">
        <input type="checkbox" className="accent-primary" id="signUp" name="signUp" value="signUp"/>
        <label for="signUp">Sign me up for bullshit.</label>
      </div>
      <div className="col-span-full items-center">
        <label>
          Sign up for our newsletter?
        </label>
        <div className="flex flex-row gap-4">
          <label className="flex flex-row items-center gap-2">
            <input type="radio" className="accent-primary" id="male" name="male" value="true"/>
            <p>Yes</p>
          </label>
          <label className="flex flex-row items-center gap-2">
            <input type="radio" className="accent-primary" id="male" name="male" value="false"/>
            <p>No</p>
          </label>
        </div>
      </div>
      <Spacer/>
      {function(){
              const {pending} = useFormStatus()
              return (
              <button type="submit" className="col-span-full" value="Submit" disabled={pending}>
                {pending ? "Submitting" : "Submit"}
              </button>
                )
            }()}
    </form>
  )
}

function UiImageWide(props){
  return (
    <div className={`${props.className} z-[2] relative h-[600px] w-full bg-cover bg-center`} style={{ backgroundImage: `url(${my_image.src})`}}/>
  )
}


function ToolTip(props){
  return (
    <div  className={`tooltip ${props.className}`}>
        <p className="text-sm text-slate-800 w-full text-center">{props.children}</p>
    </div>
  )
}

function ChartCol(props){
  const [on_hover,set_on_hover] = useState("hidden")
  let height = []
  const col_scale = 8
  const col_style = {
      'height': col_scale * props.height + "px"
  }

  return (
    <div onMouseOver={() => {set_on_hover(true)}} onMouseLeave={() => {set_on_hover(false)}} className="flex flex-col items-center w-full gap-2">
        <div style={col_style} className={`relative rounded-t-sm hover:bg-fuchsia-700 bg-fuchsia-900 hover:border-t-fuchsia-500 hover:border-x-fuchsia-500 border-x-fuchsia-700 border-t-fuchsia-700 border-b-black flex flex-col items-center w-full border border-solid transition-all duration-300`}>
          <ToolTip className={on_hover == true ? "opacity-100 top-[-48px]" : "opacity-0 top-[-32px]"}>
            {props.height}
          </ToolTip>
        </div>
        <p className={`${on_hover == true ? "opacity-100" : "opacity-50"} absolute bottom-[-24px] text-xs text-center w-full`}>{props.date}</p>
    </div>
  )
}

function Chart(){

  let data_v_nums = [
    <div className="text-xs">{+nums_min.toFixed(1)}</div>,
    <div className="text-xs">{+(nums_max/4).toFixed(1)}</div>,
    <div className="text-xs">{+(nums_max/2).toFixed(1)}</div>,
    <div className="text-xs">{+(nums_max/1.5).toFixed(1)}</div>,
    <div className="text-xs">{+(nums_max).toFixed(1)}</div>]

  const data_cols = data_sheet.map((entry, index)=>{
    return <ChartCol key={entry} date={entry["Date"]} height={entry["Value"]} index={index}/>
  })

  let num_list = []
  for (let i = 0; i < data_sheet_dates.length; i++){
    num_list.push(<div className="text-xs w-full">{data_sheet_dates[i]}</div>)
  }

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-row">
        <div className="flex flex-col justify-between border-r border-r-neutral-400 pr-2">
            {data_v_nums.reverse()}
        </div>
        <div className="border-b border-b-neutral-400 pl-2"/>
        <div className="grow flex flex-row gap-2 justify-start items-end border-b border-b-neutral-400">
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

export default function Home() {
  return (
    <MainGrid>
        <header className="col-span-full py-4"/>
        <div className="col-span-6">
          <InnerSection>
            <div className="bg-foreground w-[100px] h-[8px]"/>
            <h1>A new beginning.</h1>
          </InnerSection>
        </div>

        <div className="md:col-span-6 col-span-full">
          <InnerSection className="justify-start">
            <h3>In another life, you may regret this decision.</h3>
            <p>{lorem_ipsum + " " + lorem_ipsum}</p>
          </InnerSection>
        </div>
        
        <div className="col-span-full">
          <Chart/>
        </div>

        <div className="md:col-span-6 col-span-full">
          <div className="grid grid-cols-4 gap-4 aspect-square h-auto">
            <BigNum className="col-span-2">
              <h1>10</h1>
              <p>something something.</p>
            </BigNum>
            <BigNum className="col-span-2">
              <h1>7</h1>
              <p>something something.</p>
            </BigNum>
            <BigNum className="col-span-2">
              <h1>13</h1>
              <p>something something.</p>
            </BigNum>
            <BigNum className="col-span-2">
              <h1>8</h1>
              <p>something something.</p>
            </BigNum>
          </div>
        </div>

        <div className="md:col-span-6 col-span-full">
          <InnerSection className="justify-center">
            <h2>Contact Us</h2>
            <p>We promise it won't take long.</p>
            <Spacer/>
            <ContactForm/>
          </InnerSection>
        </div>


        <footer className="col-span-full py-4"/>
    </MainGrid>
  );
}
