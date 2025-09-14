"use client";

// Components
import MyComponent from '../components/MyComponent';
import Navbar from "../components/Navbar"

// Markdown Pages
import AboutMe from './content/about-me.mdx';

export default function HomePage() {
  return (
    <html>
      <body>
        <Navbar/>
        <center>
          <AboutMe components={{ MyComponent }}/>
        </center>

      </body>
    </html>
  );
}