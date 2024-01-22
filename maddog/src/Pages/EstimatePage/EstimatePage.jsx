import { useState, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useReactToPrint } from 'react-to-print';

import Button from '../../components/button/Button';

// import { funstions } from '../features/madDogSlice';

import EstimateTable from './EstimateTable';

import styles from './EstimatePage.module.scss';

/**
 * @description Смета
 *
 * @returns {JSX.Element}
 */

// Перечисление доступных типов файлов
const FileTypes = {
  EXCEL: 'excel',
  PDF: 'pdf',
};

export default function EstimatePage() {
  const tableRef = useRef(null);
  const [fileType, setFileType] = useState(FileTypes.EXCEL); // значение типа файла по умолчанию

  // Обработчик сохранения сметы.
  const handleSaveEstimate = () => {
    console.log('Сохранение сметы');
  };

  // Функция для предпросмотра и сохранения сметы в формате пдф
  const handlePreviewAndPrintPDF = useReactToPrint({
    bodyClass: styles.printPdf,
    content: () => tableRef.current,
  });

  // Функция для сохранения сметы в формате exel
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Смета',
    sheet: 'Estimate',
  });

  // Обработчик загрузки файла в соответствии с выбранным типом
  const handleDownload = async () => {
    if (fileType === FileTypes.PDF && tableRef.current) {
      handlePreviewAndPrintPDF();
    } else {
      onDownload();
    }
  };

  return (
    <div className={styles.container}>
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
            {Object.values(FileTypes).map((option) => (
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
