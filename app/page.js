import Image from "next/image";

const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis nisl quis elit pulvinar pharetra nec ac eros. Aliquam ut augue elementum, ultrices tortor vitae, dignissim libero. Cras ac turpis dapibus erat auctor finibus. In sit amet pulvinar neque. Sed velit tellus, molestie vel nibh eget, vulputate vestibulum nibh."


export default function Home() {
  return (
    <div className="flex flex-row justify-center">
      <div className="grid grid-cols-12 w-[1200px] border-dashed border border-foreground gap-y-4">
        <h1 className="col-span-full">Title</h1>
        <div className="col-span-6">
          <h2>Some text</h2>
          <p>{lorem_ipsum}</p>
        </div>
        <div className="col-span-6">
          <h2>Some text</h2>
          <p>{lorem_ipsum}</p>
        </div>
      </div>
    </div>
  );
}
