import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

export default function Home() {
  return (
      <>
        <p>home page</p>
        <p>Hi, wasn't too sure what to put on the homepage, but I guess this is a hobby project after I bounced off every popular method of keeping track of what books I've read and want to read. (Including, but not limited to Goodreads, Storygraph, Hardcover, paper and pencil, Google docs, Google sheets, pure memory, .txt, photos)</p>
          <p>I think it's important to shoutout Hardcover, because I'm using their API for like all the book searching. They seem like great people, if you're actually in search of a way of keeping track of reading habits I'd recommend either them or just making a doc/sheet (my doc did serve me very well and was the method that survived the longest).</p>
      </>

  );
}
