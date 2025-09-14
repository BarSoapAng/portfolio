import styles from '../css/widgets/widget.module.css';

/**
 * BaseWidget - a small reusable shell for card-like widgets.
 * Props:
 * - title: optional string shown in header
 * - size: 'small' | 'medium' | 'large' (applies preset sizes)
 * - onClick: optional click handler
 * - children: widget content
 */
export default function BaseWidget({ title, size = 'medium', onClick, children, ariaLabel }) {
  const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium;

  return (
    <div
      className={`${styles.widget} ${sizeClass}`}
      role={onClick ? 'button' : 'group'}
      onClick={onClick}
      tabIndex={0}
      aria-label={ariaLabel || title || 'widget'}
      onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) onClick(e); }}
    >
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
