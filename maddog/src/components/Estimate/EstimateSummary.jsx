import React, { useState, useEffect } from 'react';

const EstimateSummary = ({ sections, shiftsCount }) => {
  const [equipmentDiscount, setEquipmentDiscount] = useState(0);
  const [equipmentTotal, setEquipmentTotal] = useState(0);
  const [equipmentTotalWithDiscount, setEquipmentTotalWithDiscount] = useState(0);
  const [serviceTotal, setServiceTotal] = useState(0);
  const [usnDiscount, setUsnDiscount] = useState(6);
  const [usnTotal, setUsnTotal] = useState(0);

  useEffect(() => {
    let equipmentSum = 0;
    let servicesSum = 0;

    sections.forEach(section => {
      if (section.name === "ОБСЛУЖИВАНИЕ") {
        // Calculate services total
        section.tools.forEach(tool => {
          // Add tool total
          servicesSum += tool.quantity * tool.amount * (1 - (tool.discount || 0) / 100);
          
          // Add services totals if any
          if (tool.services?.length > 0) {
            tool.services.forEach(service => {
              servicesSum += service.quantity * service.amount * (1 - (service.discount || 0) / 100);
            });
          }
        });
      } else {
        // Calculate equipment total
        section.tools.forEach(tool => {
          equipmentSum += tool.quantity * tool.amount * (1 - (tool.discount || 0) / 100);
          
          if (tool.services?.length > 0) {
            tool.services.forEach(service => {
              equipmentSum += service.quantity * service.amount * (1 - (service.discount || 0) / 100);
            });
          }
        });
      }
    });

    setEquipmentTotal(equipmentSum);
    setEquipmentTotalWithDiscount(equipmentSum * (1 - equipmentDiscount / 100));
    setServiceTotal(servicesSum);

    // Calculate USN total
    const totalWithDiscount = (equipmentSum * (1 - equipmentDiscount / 100) + servicesSum) * shiftsCount;
    const usnTotalValue = totalWithDiscount / (1 - usnDiscount / 100);
    setUsnTotal(usnTotalValue);
  }, [sections, equipmentDiscount, usnDiscount, shiftsCount]);

  return (
    <div className="estimate-popup__summary">
      <div className="estimate-popup__summary-row">
        <span>Итоговая стоимость оборудования</span>
        <div className="estimate-popup__summary-values">
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">В смену:</span>
            <span className="estimate-popup__summary-number">{equipmentTotal.toFixed(2)}</span>
          </div>
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">Скидка %:</span>
            <input 
              type="number" 
              className="estimate-popup__summary-discount" 
              min="0" 
              max="100" 
              value={equipmentDiscount}
              onChange={(e) => setEquipmentDiscount(Number(e.target.value))}
            />
          </div>
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">В смену со скидкой:</span>
            <span className="estimate-popup__summary-number">{equipmentTotalWithDiscount.toFixed(2)}</span>
          </div>
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">Всего за проект:</span>
            <span className="estimate-popup__summary-number">{(equipmentTotalWithDiscount * shiftsCount).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="estimate-popup__summary-row">
        <span>Итоговая стоимость обслуживания</span>
        <div className="estimate-popup__summary-values">
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">В смену:</span>
            <span className="estimate-popup__summary-number">{serviceTotal.toFixed(2)}</span>
          </div>
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">Всего за проект:</span>
            <span className="estimate-popup__summary-number">{(serviceTotal * shiftsCount).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="estimate-popup__summary-row">
        <span>Общая стоимость</span>
        <div className="estimate-popup__summary-values">
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">За проект:</span>
            <span className="estimate-popup__summary-number">
              {((equipmentTotalWithDiscount + serviceTotal) * shiftsCount).toFixed(2)}
            </span>
          </div>
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">УСН %:</span>
            <input 
              type="number" 
              className="estimate-popup__summary-discount estimate-popup__summary-discount--usn"
              min="0" 
              max="100" 
              value={usnDiscount}
              onChange={(e) => setUsnDiscount(Number(e.target.value))}
            />
          </div>
          <div className="estimate-popup__summary-value-row">
            <span className="estimate-popup__summary-label">При оплате по УСН:</span>
            <span className="estimate-popup__summary-number">{usnTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateSummary; 