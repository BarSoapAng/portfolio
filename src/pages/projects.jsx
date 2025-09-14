import Navbar from '../components/Navbar';
import Projects from './content/projects.mdx';

export default function ProjectsPage() {
  return (
    <html>
      <body>
        <Navbar/>
        <center>
          <Projects/>
        </center>
      </body>
    </html>
  );
}
