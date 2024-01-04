import { jsPDF } from 'jspdf';
import { useState, useRef } from 'react';

import Button from '../../components/button/Button';
import NavBar from '../../components/navbar/NavBar';

import EstimateTable from './EstimateTable';

import styles from './EstimatePage.module.scss';

export default function EstimatePage() {
  const tableRef = useRef(null);
  const [fileType, setFileType] = useState('excel'); // значение типа файла по умолчанию
  const options = ['excel', 'pdf']; // доступные типы файлов

  const handleSaveEstimate = () => {
    // логика сохранения сметы
    console.log('Сохранение сметы');
  };

  const handleDownload = async () => {
    // логика генерации и скачивания файла в соответствии с выбранным типом
    if (fileType === 'pdf') {
      console.log('work');
      const doc = new jsPDF('p', 'mm', 'a4');
      doc.addFont('Arial', 'normal', 'utf8');
      doc.setFont('Arial');
      doc.setFontSize(10);
      const table = tableRef.current;

      doc.html(table, {
        callback: function (pdf) {
          pdf.save('estimate.pdf');
        },
        x: 5,
        y: 5,
        // pagesplit: true,
        // scale: 0.8,
      });
    } else {
      console.log('Выгрузка в другие типы файлов');
    }
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <section className={styles.estimatePage}>
        <EstimateTable ref={tableRef} />
        <Button
          className={styles.save}
          onClick={handleSaveEstimate}
          type="button"
          name="save-estimate"
          value="Сохранить смету"
          children="Сохранить смету"
        />
        <div className={styles.downloadBlock}>
          <p className={styles.text}>Выберите тип файлов: </p>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className={styles.select}
          >
            {options.map((option) => (
              <option key={option} value={option} className={styles.option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
          <Button
            className={styles.download}
            onClick={handleDownload}
            type="button"
            name="download-estimate"
            value="Выгрузить смету"
            children="Выгрузить смету"
          />
        </div>
      </section>
    </div>
  );
}
