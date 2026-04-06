import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import Navbar from "~/components/navbar";

export default function Root() {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>TBR</title>
            <Meta />
            <Links />
        </head>

        <body>
        <Navbar />
        <div className="App">
            <Outlet />  {/* ← this is where each route renders */}
        </div>
        <ScrollRestoration />
        <Scripts />
        </body>

        </html>
    );
}