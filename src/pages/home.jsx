"use client";

// Components
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// Widgets
import SelfDescriptionWidget from "../components/widgets/SelfDescriptionWidget"
import GalleryWidget from "../components/widgets/GalleryWidget"
import MusicCardWidget from "../components/widgets/MusicCardWidget"
import PlantWidget from "../components/widgets/PlantWidget"
import ExampleWidget from '../components/widgets/ExampleWidget';

// Styles
import styles from "./css/home.module.css"

// Markdown Pages
// import AboutMe from './content/about-me.mdx';

export default function HomePage() {
  return (
    <html>
      <body>
        <Navbar/>
        <center className='pageContent'>
          <SelfDescriptionWidget />

          <div className={styles.bottom}>
            <MusicCardWidget/>
            <div className={styles.right}>
              <GalleryWidget />
              <div className={styles.smallRight}>
                <PlantWidget />
                <ExampleWidget />
              </div>

            </div>
          </div>
          
          {/* <AboutMe components={{ MyComponent, ExampleWidget }}/> */}
        </center>
        <Footer/>
      </body>
    </html>
  );
}