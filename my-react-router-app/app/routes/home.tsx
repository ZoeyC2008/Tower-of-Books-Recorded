import type {Route} from "./+types/home";
import {Welcome} from "../welcome/welcome";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

import "~/app.css"

export default function Home() {
    return (
        <>
            <div style={{
                margin: "0 auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}>
                <h1 style={{
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: "#80471c",
                    margin: 0,
                    alignSelf: "center",
                    fontFamily: "serif",
                }}>
                    Home
                </h1>

                <div style={{
                    backgroundColor: "#fdf6ec",
                    border: "2px solid #b87d11",
                    borderRadius: "8px",
                    padding: "1rem 1.25rem",
                    color: "#b87d11",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                }}>
                    <p style={{ margin: 0 }}>
                        Shoutout to Hardcover, because I'm using their API for free to search
                        through their book database. They seem like great people — if you're
                        actually in search of a way of keeping track of reading habits I'd
                        recommend either them or just making a doc/sheet (my doc did serve me
                        very well and was the method that survived the longest).
                    </p>
                </div>
            </div>
        </>

    );
}
