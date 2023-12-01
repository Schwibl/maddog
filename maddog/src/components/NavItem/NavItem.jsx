import styles from './NavItem.module.scss';

export default function NavItem (props) {

    const { text, children } = props;
    return (
        <div className={styles.wrap}>
            <div className={styles.imgWrap}>
                {children}
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    )
}