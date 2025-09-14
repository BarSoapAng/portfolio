import styles from './css/footer.module.css';
import Link from 'next/link';

function Footer() {
  return (
    <nav className={styles.footer}>
      <div className={styles.footerInner}>
          <Link href="/projects" className={styles.link}>1</Link>
          <Link href="#" className={styles.link}>2</Link>
          <Link href="#" className={styles.link}>3</Link>
      </div>
    </nav>
  );
}

export default Footer;