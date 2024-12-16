import React from 'react';
import './estimate.scss';

const TEMPLATE_DATA = {
  period: {
    start: '08-03-2023',
    end: '13-05-2023'
  },
  shiftsCount: 29,
  project: 'Мероприятие в ЦПКиО',
  operator: 'Выберите оператора',
  customer: 'Иванов Сергей',
  manager: {
    name: 'best admin',
    phone: '+79887553454'
  },
  accessories: [
    { name: 'Микрофон 1', cost: 12, units: 2, days: 4, discount: 'Скидка', total: 54, totalWithDiscount: 54 },
    { name: 'Микрофон 3', cost: 14, units: 4, days: 4, discount: 'Скидка', total: 56, totalWithDiscount: 56 },
    { name: 'Микрофон 5', cost: 18, units: 5, days: 4, discount: 'Скидка', total: 96, totalWithDiscount: 96 },
    { name: 'Микрофон 9', cost: 20, units: 10, days: 4, discount: 'Скидка', total: 200, totalWithDiscount: 200 },
    { name: 'Микрофон 10', cost: 21, units: 11, days: 4, discount: 'Скидка', total: 231, totalWithDiscount: 231 },
    { name: 'Микрофон 11', cost: 22, units: 12, days: 4, discount: 'Скидка', total: 264, totalWithDiscount: 264 }
  ],
  services: [
    { name: 'Доставка оборудования', cost: 5000, units: 1, days: 1, discount: 'Нет', total: 5000, totalWithDiscount: 5000 },
    { name: 'Монтаж/демонтаж', cost: 3000, units: 1, days: 1, discount: 'Нет', total: 3000, totalWithDiscount: 3000 },
    { name: 'Техническое сопровождение', cost: 4000, units: 1, days: 4, discount: 'Нет', total: 16000, totalWithDiscount: 16000 }
  ],
  totals: {
    equipmentTotal: 174,
    equipmentTotalWithDiscount: 174,
    servicesTotal: 3480,
    servicesTotalWithDiscount: 3480,
    grandTotal: 3480
  }
};

const ProjectEstimatePopUp = ({ projectId, onClose }) => {
  const handleSave = () => {
    console.log('Saving estimate for project:', projectId);
    // TODO: Implement save functionality
    onClose();
  };

  return (
    <div className="estimate-popup">
      <div className="estimate-popup__content">
        <div className="estimate-popup__header">
          {/* <img 
            src="/images/logo.png" 
            alt="Mad Dog Rental" 
            className="estimate-popup__logo"
          /> */}
          <div className="estimate-popup__info">
            <div className="estimate-popup__period-container">
              <span className="estimate-popup__period-label">Съемочный период:</span>
              <div className="estimate-popup__period-values">
                <div className="estimate-popup__period-row">
                  <span className="estimate-popup__period-sublabel">Начало:</span>
                  <span className="estimate-popup__value">{TEMPLATE_DATA.period.start}</span>
                </div>
                <div className="estimate-popup__period-row">
                  <span className="estimate-popup__period-sublabel">Конец:</span>
                  <span className="estimate-popup__value">{TEMPLATE_DATA.period.end}</span>
                </div>
              </div>
            </div>
            <div className="estimate-popup__manager">
              <span className="estimate-popup__manager-label">Менеджер:</span>
              <div className="estimate-popup__manager-values">
                <div className="estimate-popup__manager-row">
                  <span className="estimate-popup__manager-sublabel">Имя:</span>
                  <span className="estimate-popup__value">{TEMPLATE_DATA.manager.name}</span>
                </div>
                <div className="estimate-popup__manager-row">
                  <span className="estimate-popup__manager-sublabel">Телефон:</span>
                  <span className="estimate-popup__value">{TEMPLATE_DATA.manager.phone}</span>
                </div>
              </div>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Количество смен:</span>
              <span className="estimate-popup__value">{TEMPLATE_DATA.shiftsCount}</span>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Проект:</span>
              <span className="estimate-popup__value">{TEMPLATE_DATA.project}</span>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Оператор:</span>
              <span className="estimate-popup__value">{TEMPLATE_DATA.operator}</span>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Заказчик:</span>
              <span className="estimate-popup__value">{TEMPLATE_DATA.customer}</span>
            </div>

          </div>
        </div>

        <table className="estimate-popup__table">
          <thead>
            <tr>
              <th>Наименование оборудования</th>
              <th>Стоимость</th>
              <th>Единиц техники</th>
              <th>Дней</th>
              <th>Скидка</th>
              <th>Итого за смену</th>
              <th>Итого за смену с учетом скидки</th>
            </tr>
          </thead>
          <tbody>
            <tr className="estimate-popup__group-header">
              <td colSpan="7">Аксессуары</td>
            </tr>
            {TEMPLATE_DATA.accessories.map((item, index) => (
              <tr key={`accessory-${index}`}>
                <td>{item.name}</td>
                <td>{item.cost}</td>
                <td>{item.units}</td>
                <td>{item.days}</td>
                <td>{item.discount}</td>
                <td>{item.total}</td>
                <td>{item.totalWithDiscount}</td>
              </tr>
            ))}
            <tr className="estimate-popup__group-header">
              <td colSpan="7">Обслуживание и транспорт</td>
            </tr>
            {TEMPLATE_DATA.services.map((item, index) => (
              <tr key={`service-${index}`}>
                <td>{item.name}</td>
                <td>{item.cost}</td>
                <td>{item.units}</td>
                <td>{item.days}</td>
                <td>{item.discount}</td>
                <td>{item.total}</td>
                <td>{item.totalWithDiscount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="estimate-popup__summary">
          <div className="estimate-popup__summary-row">
            <span>Итоговая стоимость оборудования</span>
            <div className="estimate-popup__summary-values">
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">В смену:</span>
                <span className="estimate-popup__summary-number">{TEMPLATE_DATA.totals.equipmentTotal}</span>
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">Скидка %:</span>
                <input 
                  type="number" 
                  className="estimate-popup__summary-discount" 
                  min="0" 
                  max="100" 
                  defaultValue="0"
                />
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">В смену со скидкой:</span>
                <span className="estimate-popup__summary-number">{TEMPLATE_DATA.totals.equipmentTotalWithDiscount}</span>
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">Всего за проект:</span>
                <span className="estimate-popup__summary-number">{TEMPLATE_DATA.totals.equipmentTotalWithDiscount * TEMPLATE_DATA.shiftsCount}</span>
              </div>
            </div>
          </div>
          <div className="estimate-popup__summary-row">
            <span>Итоговая стоимость обслуживания</span>
            <div className="estimate-popup__summary-values">
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">В смену:</span>
                <span className="estimate-popup__summary-number">{TEMPLATE_DATA.totals.servicesTotal}</span>
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">Скидка %:</span>
                <input 
                  type="number" 
                  className="estimate-popup__summary-discount" 
                  min="0" 
                  max="100" 
                  defaultValue="0"
                />
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">В смену со скидкой:</span>
                <span className="estimate-popup__summary-number">{TEMPLATE_DATA.totals.servicesTotalWithDiscount}</span>
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">Всего за проект:</span>
                <span className="estimate-popup__summary-number">{TEMPLATE_DATA.totals.servicesTotalWithDiscount * TEMPLATE_DATA.shiftsCount}</span>
              </div>
            </div>
          </div>
          <div className="estimate-popup__summary-row">
            <span>Общая стоимость</span>
            <div className="estimate-popup__summary-values">
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">За проект:</span>
                <span className="estimate-popup__summary-number">
                  {(TEMPLATE_DATA.totals.equipmentTotalWithDiscount + TEMPLATE_DATA.totals.servicesTotalWithDiscount) * TEMPLATE_DATA.shiftsCount}
                </span>
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">УСН %:</span>
                <input 
                  type="number" 
                  className="estimate-popup__summary-discount" 
                  min="0" 
                  max="100" 
                  defaultValue="6"
                />
              </div>
              <div className="estimate-popup__summary-value-row">
                <span className="estimate-popup__summary-label">При оплате по УСН:</span>
                <span className="estimate-popup__summary-number">{TEMPLATE_DATA.totals.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="estimate-popup__controls">
          <button 
            className="estimate-popup__button estimate-popup__button--save"
            onClick={handleSave}
          >
            Сохранить
          </button>
          <button 
            className="estimate-popup__button estimate-popup__button--cancel"
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectEstimatePopUp; 