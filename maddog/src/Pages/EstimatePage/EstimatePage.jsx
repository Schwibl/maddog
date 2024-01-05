// import Html2Pdf from 'js-html2pdf';
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

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

  const handlePrint = useReactToPrint({
    bodyClass: styles.printPdf,
    content: () => tableRef.current,

    // логика сохранения в пдф таблицы как изображения
    // print: async (printIframe) => {
    //   const document = printIframe.contentDocument;
    //   if (document) {
    //     const html = document.getElementsByTagName('html')[0];
    //     const exporter = new Html2Pdf(html);
    //     await exporter.getPdf(true);
    //   }
    // },
  });

  // логика генерации и скачивания файла в соответствии с выбранным типом
  const handleDownload = async () => {
    if (fileType === 'pdf') {
      handlePrint();
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
          type='button'
          name='save-estimate'
          value='Сохранить смету'
          children='Сохранить смету'
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
            type='button'
            name='download-estimate'
            value='Выгрузить смету'
            children='Выгрузить смету'
          />
        </div>
      </section>
    </div>
  );
}
