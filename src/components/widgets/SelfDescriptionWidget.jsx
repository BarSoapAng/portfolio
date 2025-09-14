import BaseWidget from './BaseWidget';

import Description from './content/self-description.mdx';

import styles from './css/self-description.module.css';

export default function SelfDescriptionWidget() {
  return (
    <BaseWidget size="large" ariaLabel="self-description">
      <img src="public/file.svg" className={styles.img}></img>
      <div className='mt-3 mr-6'><Description/></div>
    </BaseWidget>
  );
}
