import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postEstimate } from '../../actions/estimateApi';
import EstimateSummary from './EstimateSummary';
import './estimate.scss';


const ProjectEstimatePopUp = ({ project, pattern, onClose }) => {
  const dispatch = useDispatch();
  const [toolValues, setToolValues] = useState({});
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [estimateData, setEstimateData] = useState({
    period: {
      start: project.start,
      end: project.end
    },
    manager: {
      name: project.employee.fullName,
      phone: project.employee.phoneNumber
    },
    shiftsCount: project.quantity || project.workingShifts.length,
    project: project.name,
    operator: project.employee.fullName,
    customer: project.client.name,
    sections: pattern.sections
  });
  
  const updateToolValue = (toolId, field, value) => {
    setToolValues(prev => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        [field]: value
      }
    }));
  };

  const getToolValue = (toolId, field, defaultValue) => {
    return toolValues[toolId]?.[field] ?? defaultValue;
  };

  console.log("pattern in estimate pop up", pattern);

  useEffect(() => {
    if (pattern && estimateData) {
      console.log('Pattern data:', pattern);
      console.log('Project estimate data:', estimateData);
    }
  }, [pattern, estimateData]);

  /**
   * Обработчик сохранения сметы.
   * Собирает данные из состояния компонента и отправляет их на сервер
   * с помощью action postEstimate
   */
  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log('Saving estimate for project:', project.id);
      
      // Подготавливаем данные для отправки на сервер
      const dataToSave = {
        projectId: project.id,
        name: project.name,
        quantityShifts: String(project.quantity || project.workingShifts.length),
        filmingPeriod: `${project.start} - ${project.end}`,
        operator: project.employee.fullName,
        customer: project.client.name,
        manager: project.employee.fullName,
        phone: project.employee.phoneNumber || "",
        site: "",
        
        // Format sections according to API requirements
        sections: estimateData.sections
          .filter(section => section.tools.length > 0) // Only include sections that have tools
          .map(section => ({
            name: section.name,
            tools: section.tools.map(tool => {
              // Get the tool values from state or use defaults
              const days = getToolValue(tool.id, 'days', 1);
              const discount = getToolValue(tool.id, 'discount', 0);
              
              return {
                name: tool.name,
                price: String(tool.amount || 0),
                quantity: String(tool.quantity || 1),
                sectionId: 0,
                services: (tool.services || []).map(service => {
                  // Get the service values from state or use defaults
                  const serviceDays = getToolValue(`${tool.id}-${service.id}`, 'days', 1);
                  const serviceDiscount = getToolValue(`${tool.id}-${service.id}`, 'discount', 0);
                  
                  return {
                    name: service.name,
                    price: String(service.amount || 0),
                    quantity: String(service.quantity || 1),
                    toolId: 0
                  };
                })
              };
            })
          }))
      };
      
      console.log('Sending estimate data:', dataToSave);
      
      // Отправляем данные на сервер
      const result = await dispatch(postEstimate(dataToSave)).unwrap();
      console.log('Estimate saved successfully:', result);
      
      // Показываем уведомление об успешном сохранении
      alert('Смета успешно сохранена');
      
      // Закрываем окно
      onClose();
    } catch (error) {
      // Если произошла ошибка, показываем уведомление с ошибкой
      alert(`Ошибка при сохранении сметы: ${error.message || 'Неизвестная ошибка'}`);
      console.error('Error saving estimate:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleSelectSection = (sectionName) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      const section = estimateData.sections.find(s => s.name === sectionName);
      
      section.tools.forEach(tool => {
        const toolId = tool.id;
        if (newSet.has(toolId)) {
          newSet.delete(toolId);
        } else {
          newSet.add(toolId);
        }
        
        tool.services?.forEach(service => {
          const serviceId = `${tool.id}-${service.id}`;
          if (newSet.has(serviceId)) {
            newSet.delete(serviceId);
          } else {
            newSet.add(serviceId);
          }
        });
      });
      
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      let shouldSelectAll = false;
      
      // Check if all items are already selected
      const allItems = estimateData.sections.flatMap(section => {
        const toolIds = section.tools.map(tool => tool.id);
        const serviceIds = section.tools.flatMap(tool => 
          tool.services?.map(service => `${tool.id}-${service.id}`) || []
        );
        return [...toolIds, ...serviceIds];
      });
      
      if (allItems.length !== newSet.size) {
        shouldSelectAll = true;
      }

      if (shouldSelectAll) {
        allItems.forEach(id => newSet.add(id));
      } else {
        newSet.clear();
      }
      
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    setEstimateData(prev => {
      const newSections = prev.sections.map(section => ({
        ...section,
        tools: section.tools
          .filter(tool => !selectedItems.has(tool.id))
          .map(tool => ({
            ...tool,
            services: tool.services?.filter(
              service => !selectedItems.has(`${tool.id}-${service.id}`)
            )
          }))
      }));
      return { ...prev, sections: newSections };
    });
    setSelectedItems(new Set());
  };

  return (
    <div className="estimate-popup">
      <div className="estimate-popup__content">
        <div className="estimate-popup__header">
          <div className="estimate-popup__info">
            <div className="estimate-popup__period-container">
              <span className="estimate-popup__period-label">Съемочный период:</span>
              <div className="estimate-popup__period-values">
                <div className="estimate-popup__period-row">
                  <span className="estimate-popup__period-sublabel">Начало:</span>
                  <span className="estimate-popup__value">{estimateData.period.start}</span>
                </div>
                <div className="estimate-popup__period-row">
                  <span className="estimate-popup__period-sublabel">Конец:</span>
                  <span className="estimate-popup__value">{estimateData.period.end}</span>
                </div>
              </div>
            </div>
            <div className="estimate-popup__manager">
              <span className="estimate-popup__manager-label">Менеджер:</span>
              <div className="estimate-popup__manager-values">
                <div className="estimate-popup__manager-row">
                  <span className="estimate-popup__manager-sublabel">Имя:</span>
                  <span className="estimate-popup__value">{estimateData.manager.name}</span>
                </div>
                <div className="estimate-popup__manager-row">
                  <span className="estimate-popup__manager-sublabel">Телефон:</span>
                  <span className="estimate-popup__value">{estimateData.manager.phone}</span>
                </div>
              </div>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Количество смен:</span>
              <span className="estimate-popup__value">{estimateData.shiftsCount}</span>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Проект:</span>
              <span className="estimate-popup__value">{estimateData.project}</span>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Оператор:</span>
              <span className="estimate-popup__value">{estimateData.operator}</span>
            </div>
            <div className="estimate-popup__info-row">
              <span className="estimate-popup__label">Заказчик:</span>
              <span className="estimate-popup__value">{estimateData.customer}</span>
            </div>
          </div>
        </div>

        <table className="estimate-popup__table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.size > 0 && 
                    selectedItems.size === estimateData.sections.flatMap(s => 
                      [...s.tools, ...s.tools.flatMap(t => t.services || [])]
                    ).length}
                />
              </th>
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
            {estimateData.sections.map((section, index) => {
              return <>
                <tr className="estimate-popup__group-header">
                  <td>
                    <button
                      className="estimate-popup__select-section"
                      onClick={() => handleSelectSection(section.name)}
                    >
                      {selectedItems.size > 0 && section.tools.every(tool => 
                        selectedItems.has(tool.id) && 
                        tool.services?.every(service => selectedItems.has(`${tool.id}-${service.id}`))
                      ) ? '✓' : '...'}
                    </button>
                  </td>
                  <td colSpan="7">{section.name}</td>
                </tr>
                {section.tools.map((tool, index) => {
                  const days = getToolValue(tool.id, 'days', 1);
                  const discount = getToolValue(tool.id, 'discount', 0);
                  const total = tool.amount * tool.quantity * days;
                  const totalWithDiscount = Number((total * (1 - discount / 100)).toFixed(2));
                  
                  return <>
                    <tr key={`tool-${tool.id}`}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.has(tool.id)}
                          onChange={() => handleSelectItem(tool.id)}
                        />
                      </td>
                      <td className={tool.services?.length ? "estimate-popup__tool-with-services" : ""}>{tool.name}</td>
                      <td>{tool.amount}</td>
                      <td>
                        <input 
                          type="number" 
                          min="1"
                          className="estimate-popup__input"
                          value={tool.quantity}
                          onChange={(e) => {
                            const newTool = {...tool, quantity: Number(e.target.value)};
                            const newSection = {...section};
                            const toolIndex = newSection.tools.findIndex(t => t.id === tool.id);
                            newSection.tools[toolIndex] = newTool;
                            const newSections = [...estimateData.sections];
                            const sectionIndex = newSections.findIndex(s => s.name === section.name);
                            newSections[sectionIndex] = newSection;
                            setEstimateData({...estimateData, sections: newSections});
                          }}
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          min="0"
                          className="estimate-popup__input"
                          value={days}
                          onChange={(e) => updateToolValue(tool.id, 'days', Number(e.target.value))}
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          className="estimate-popup__input"
                          value={discount}
                          onChange={(e) => updateToolValue(tool.id, 'discount', Number(e.target.value))}
                        />
                      </td>
                      <td>{total}</td>
                      <td>{totalWithDiscount}</td>
                    </tr>
                    {tool.services?.length > 0 && tool.services.map((service) => {
                      const serviceDays = getToolValue(`${tool.id}-${service.id}`, 'days', 1);
                      const serviceDiscount = getToolValue(`${tool.id}-${service.id}`, 'discount', 0);
                      const serviceTotal = service.amount * service.quantity * serviceDays;
                      const serviceTotalWithDiscount = Number((serviceTotal * (1 - serviceDiscount / 100)).toFixed(2));
                      
                      return <tr key={`service-${tool.id}-${service.id}`}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedItems.has(`${tool.id}-${service.id}`)}
                            onChange={() => handleSelectItem(`${tool.id}-${service.id}`)}
                          />
                        </td>
                        <td style={{ paddingLeft: '20px' }}>{service.name}</td>
                        <td>{service.amount}</td>
                        <td>
                          <input 
                            type="number" 
                            min="1"
                            className="estimate-popup__input"
                            value={service.quantity}
                            onChange={(e) => {
                              const newService = {...service, quantity: Number(e.target.value)};
                              const newTool = {...tool};
                              const serviceIndex = newTool.services.findIndex(s => s.id === service.id);
                              newTool.services[serviceIndex] = newService;
                              const newSection = {...section};
                              const toolIndex = newSection.tools.findIndex(t => t.id === tool.id);
                              newSection.tools[toolIndex] = newTool;
                              const newSections = [...estimateData.sections];
                              const sectionIndex = newSections.findIndex(s => s.name === section.name);
                              newSections[sectionIndex] = newSection;
                              setEstimateData({...estimateData, sections: newSections});
                            }}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            min="0"
                            className="estimate-popup__input"
                            value={serviceDays}
                            onChange={(e) => updateToolValue(`${tool.id}-${service.id}`, 'days', Number(e.target.value))}
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            min="0"
                            max="100"
                            className="estimate-popup__input"
                            value={serviceDiscount}
                            onChange={(e) => updateToolValue(`${tool.id}-${service.id}`, 'discount', Number(e.target.value))}
                          />
                        </td>
                        <td>{serviceTotal}</td>
                        <td>{serviceTotalWithDiscount}</td>
                      </tr>
                    })}
                  </>
                })}
              </> 
            })}
          </tbody>
        </table>

        <EstimateSummary sections={estimateData.sections} shiftsCount={estimateData.shiftsCount} />

        <div className="estimate-popup__controls">
          <button 
            className="estimate-popup__button estimate-popup__button--save"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button 
            className="estimate-popup__button estimate-popup__button--cancel"
            onClick={onClose}
            disabled={isSaving}
          >
            Отмена
          </button>
        </div>

        {selectedItems.size > 0 && (
          <div className="estimate-popup__sticky-footer">
            <button
              className="estimate-popup__button estimate-popup__button--delete"
              onClick={handleDeleteSelected}
            >
              Удалить выбранные ({selectedItems.size})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectEstimatePopUp; 