import { useState, useRef, useContext, useEffect } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useNavigate, useParams } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/button/Button';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import { postEstimate } from '../../actions/estimateApi';

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
  // Проверка на пользователя. Если не авторизован пользователь, ведем на экран авторизации
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { estimateHref } = useParams();
  
  // Получаем данные сметы из Redux store
  const estimateData = useSelector((state) => state.estimate);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const tableRef = useRef(null);
  const [fileType, setFileType] = useState(FileTypes.EXCEL); // значение типа файла по умолчанию
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Обработчик сохранения сметы.
   * Собирает данные из Redux store и отправляет их на сервер
   * с помощью action postEstimate
   */
  const handleSaveEstimate = async () => {
    try {
      setIsSaving(true);
      
      // Format the filming period as a string if available
      const filmingPeriod = estimateData.filmingPeriod || "";
      
      // Формируем объект с данными сметы для отправки на сервер
      const estimateToSave = {
        projectId: parseInt(estimateHref) || 0,
        name: estimateData.name || "",
        quantityShifts: String(estimateData.quantityShift || ""),
        filmingPeriod: filmingPeriod,
        operator: estimateData.operator || "",
        customer: estimateData.customer || "",
        manager: estimateData.manager || "",
        phone: estimateData.phone || "",
        site: estimateData.site || "",
        
        // Format sections according to API requirements, if available
        sections: estimateData.sections || []
      };
      
      // Отправляем данные на сервер
      await dispatch(postEstimate(estimateToSave)).unwrap();
      
      // Если успешно сохранено, показываем уведомление
      alert('Смета успешно сохранена');
    } catch (error) {
      // Если произошла ошибка, показываем уведомление с ошибкой
      alert(`Ошибка при сохранении сметы: ${error.message || 'Неизвестная ошибка'}`);
      console.error('Error saving estimate:', error);
    } finally {
      setIsSaving(false);
    }
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
          disabled={isSaving}
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
