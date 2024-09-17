import Image from "next/image";

const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl quis elit pulvinar pharetra nec ac eros. Aliquam ut augue elementum, ultrices tortor vitae, dignissim libero. Cras ac turpis dapibus erat auctor finibus. In sit amet pulvinar neque. Sed velit tellus, molestie vel nibh eget, vulputate vestibulum nibh."

function MainGrid({children}) {
  return(
    <div className="flex flex-row justify-center">
      <div className="grid grid-cols-12 w-[1200px] gap-16">
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

function UiImage(){
  return (
    <image className="w-full aspect-square bg-cover ui-frame flex flex-row justify-center items-center">
      <p>X</p>
    </image>
  )
}

export default function Home() {
  return (
    <MainGrid>
        <header className="col-span-full py-4"/>
        <div className="col-span-full">
          <InnerSection>
            <div className="bg-foreground w-[100px] h-[16px]"/>
            <h1>We've got a problem.</h1>
          </InnerSection>
        </div>
        
        <div className="md:col-span-6 col-span-full">
          <InnerSection className="justify-center">
            <h3>In another life, you may regret this decision.</h3>
            <p>{lorem_ipsum}</p>
            <p>{lorem_ipsum}</p>
            <button className="">Explore Books</button>
          </InnerSection>
        </div>
        <div className="md:col-span-6 col-span-full">
          <UiImage/>
        </div>

        <div className="md:col-span-6 col-span-full">
          <UiImage/>
        </div>
        <div className="md:col-span-6 col-span-full">
          <InnerSection className="justify-center">
            <h3>Some text</h3>
            <p>{lorem_ipsum}</p>
            <button className="">Explore Books</button>
          </InnerSection>
        </div>

        <footer className="col-span-full py-4"/>
    </MainGrid>
  );
}
