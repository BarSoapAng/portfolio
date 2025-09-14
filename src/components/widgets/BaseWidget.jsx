import styles from './css/widget.module.css';

/**
 * BaseWidget - a small reusable shell for card-like widgets.
 * Props:
 * - title: optional string shown in header
 * - size: 'small' | 'medium' | 'large' (applies preset sizes)
 * - onClick: optional click handler
 * - children: widget content
 */
export default function BaseWidget({ title, size, onClick, children, ariaLabel }) {
  let sizeClass;

  if (size === 'small') {
    sizeClass = styles.small;
  } else if (size === 'large') {
    sizeClass = styles.large;
  } else if (size === 'medium-vert') {
    sizeClass = styles.mediumVert;
  } else {
    sizeClass = styles.mediumHor;
  }

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
