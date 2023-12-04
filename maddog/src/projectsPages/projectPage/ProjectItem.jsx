import styles from './ProjectPage.module.scss';
import {
    Link
} from 'react-router-dom';

function ProjectItem(props) {
    const { projectName, projectHref, estimateHref } = props;
    return (
        <div className={styles.gridRow}>
            <div className={styles.gridCell}>
                <input type='checkbox' />
            </div>
            <div className={styles.gridCell}>
                <Link href={projectHref}>
                    {projectName}
                </Link>
            </div>
            <div className={styles.gridCell}>Создан</div>
            <div className={styles.gridCell}>Иванов Сергей</div>
            <div className={styles.gridCell}>+79887555454</div>
            <div className={styles.gridCell}>02-10-2023 16:00</div>
            <div className={styles.gridCell}>19-10-2023 04:00</div>
            <div className={styles.gridCell}>31-10-2023 23:29</div>
            <div className={styles.gridCell}>Petrov Ivan</div>
            <div className={styles.gridCell}>Примечание</div>
            <div className={styles.gridCell}>Разовый</div>
            <div className={styles.gridCell}>
                <Link href={estimateHref}>
                    Ссылка на смету
                </Link>
            </div>
        </div>
    );
}

export default ProjectItem