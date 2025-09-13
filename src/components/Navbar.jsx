import styles from '../css/components/navbar.module.css';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="" className={styles.home}>Home</Link>
        <div className={styles.navLinks}>
          <Link href="/projects" className={styles.link}>1</Link>
          <Link href="#" className={styles.link}>2</Link>
          <Link href="#" className={styles.link}>3</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;