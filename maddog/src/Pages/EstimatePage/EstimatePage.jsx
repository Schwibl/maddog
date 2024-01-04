import { useDispatch, useSelector } from "react-redux";
import Button from '../../components/button/Button';
import NavBar from '../../components/navbar/NavBar';

// import { funstions } from "../features/madDogSlice";

import EstimateTable from './EstimateTable';

import styles from './EstimatePage.module.scss';

export default function EstimatePage() {
  // const [fileType, setFileType] = useState('excel'); // значение типа файла по умолчанию
  const typeFile = useSelector((state) => state.typeFile.value);
  const options = ['excel', 'pdf']; // доступные типы файлов

  const handleSaveEstimate = () => {
    // логика сохранения сметы
    console.log('Сохранение сметы');
  };

  const handleDownload = () => {
    // логика генерации и скачивания файла в соответствии с выбранным типом
    console.log('Выгрузка файла');
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <section className={styles.estimatePage}>
        <EstimateTable />
        <Button className={styles.save} onClick={handleSaveEstimate} type='button' name='save-estimate' value='Сохранить смету' children='Сохранить смету'/>
        <div className={styles.downloadBlock}>
          <p className={styles.text}>Выберите тип файлов: </p>
          <select value={value} onChange={(e) => state.typeFile.value} className={styles.select}>
            {options.map((option) => (
              <option key={option} value={option} className={styles.option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
          <Button className={styles.download} onClick={handleDownload} type='button' name='download-estimate' value='Выгрузить смету' children='Выгрузить смету'/>
        </div>
      </section>
    </div>
  );
}
