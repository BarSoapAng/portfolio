"use client";

// Components
import MyComponent from '../components/MyComponent';
import Navbar from "../components/Navbar"
import ExampleWidget from '../widgets/ExampleWidget';

// Markdown Pages
import AboutMe from './content/about-me.mdx';

export default function HomePage() {
  return (
    <html>
      <body>
        <Navbar/>
        <center className='pageContent'>
          <AboutMe components={{ MyComponent, ExampleWidget }}/>
        </center>

      </body>
    </html>
  );
}