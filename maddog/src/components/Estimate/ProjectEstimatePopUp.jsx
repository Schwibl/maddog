import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEstimateById } from '../../actions/estimateApi';
import EstimateSummary from './EstimateSummary';
import './estimate.scss';


const ProjectEstimatePopUp = ({ project, pattern, onClose }) => {
  const dispatch = useDispatch();
  const [toolValues, setToolValues] = useState({});
  const [estimateData, setEstimateData] = useState({
    period: {
      start: project.start,
      end: project.end
    },
    manager: {
      name: project.employee.fullName,
      phone: project.employee.phoneNumber
    },
    shiftsCount: project.workingShifts.length,
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

  //project
    // {
    //   "id": 30,
    //   "number": 1,
    //   "classification": "ONE_TIME",
    //   "status": "CREATE",
    //   "name": "nneew",
    //   "typeLease": "STRAIGHT",
    //   "quantity": 2,
    //   "created": "2025-01-10T09:42:31",
    //   "employee": {
    //       "id": 3,
    //       "username": "adm",
    //       "fullName": "best admin",
    //       "phoneNumber": "+9996666",
    //       "roles": "ADMIN",
    //       "color": "ORANGE",
    //       "active": false
    //   },
    //   "client": {
    //       "id": 20,
    //       "name": "tony kroos",
    //       "roleContact": "Клиент",
    //       "phoneNumber": "+1",
    //       "company": null,
    //       "photos": [],
    //       "comment": {
    //           "id": 26,
    //           "text": "sacasaca",
    //           "created": "2024-07-24T18:48:04",
    //           "authorId": 3,
    //           "contactId": 20,
    //           "toolsId": null
    //       }
    //   },
    //   "start": "2025-01-09T21:00:00",
    //   "end": "2025-01-10T21:00:00",
    //   "phoneNumber": "",
    //   "photos": [],
    //   "discount": 0,
    //   "note": "",
    //   "sum": 0,
    //   "finalSumUsn": 0,
    //   "priceTools": 0,
    //   "priceWork": 0,
    //   "discountByProject": 0,
    //   "sumWithDiscount": 0,
    //   "received": null,
    //   "remainder": null,
    //   "tools": [],
    //   "estimate": null,
    //   "workingShifts": []
    // }
  // pattern
    // {
    //   "id": 1,
    //   "name": "",
    //   "quantityShifts": "",
    //   "filmingPeriod": "",
    //   "operator": "",
    //   "customer": "",
    //   "manager": "",
    //   "phone": "",
    //   "site": "maddogrental.pro",
    //   "sections": [
      //     {
      //         "id": 0,
      //         "name": "Камера",
      //         "tools": [
      //             {
      //                 "id": 1,
      //                 "name": "Arri Alexa Mini",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 2,
      //                 "name": "Arri Alexa Mini LF",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 3,
      //                 "name": "Arri Alexa 35",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 4,
      //                 "name": "RED V-Raptor 8K FF",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 5,
      //                 "name": "RED Monstro 8K FF",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 6,
      //                 "name": "RED Gemini 5K S35",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 7,
      //                 "name": "RED Komodo 6K S35",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 8,
      //                 "name": "Sony Venice",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 9,
      //                 "name": "Rialto",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 10,
      //                 "name": "GoPro 9/10",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             },
      //             {
      //                 "id": 11,
      //                 "name": "BlackMagic 6K PRO PL(In cage;2-ssd;V-mount plate;15mm Rods;Cabels)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 1,
      //                 "services": []
      //             }
      //         ]
      //     },
      //     {
      //         "id": 0,
      //         "name": "Комплект",
      //         "tools": [
      //             {
      //                 "id": 12,
      //                 "name": "Карты памяти 1TB",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 13,
      //                 "name": "Карты памяти 660GB",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 14,
      //                 "name": "Карты памяти 512GB",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 15,
      //                 "name": "Карты памяти 480GB",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 17,
      //                 "name": "Карты памяти 256GB",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 18,
      //                 "name": "Коммутация",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 19,
      //                 "name": "Картридер",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 20,
      //                 "name": "Зарядное устройство V-Mount",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 21,
      //                 "name": "Аккумуляторы V-Mount",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             },
      //             {
      //                 "id": 22,
      //                 "name": "Фоллоу фокус",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 2,
      //                 "services": []
      //             }
      //         ]
      //     },
      //     {
      //         "id": 0,
      //         "name": "Операторская техника",
      //         "tools": [
      //             {
      //                 "id": 23,
      //                 "name": "Голова штативная Sachtler Cine 30HD",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 24,
      //                 "name": "Голова штативная Sachtler Video25",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 25,
      //                 "name": "Голова штативная O'Connor 2060",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 26,
      //                 "name": "Голова штативная O'Connor 2560",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 27,
      //                 "name": "Штатив с головой Sachtler 18sb",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 28,
      //                 "name": "Штатив Sachtler Cine 2000 Long",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 29,
      //                 "name": "Штатив Sachtler Universal Carbon",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 30,
      //                 "name": "Штатив Sachtler Cine 2000 Medium",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 31,
      //                 "name": "Штатив Sachtler Cine 2000 Short",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 32,
      //                 "name": "Штатив Hi-Hat",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 33,
      //                 "name": "Компендиум ARRI LMB 4x5",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 34,
      //                 "name": "Плечевой упор ARRI / Wooden camera",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             },
      //             {
      //                 "id": 35,
      //                 "name": "Монитор операторский TvLogic-f5a",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 3,
      //                 "services": []
      //             }
      //         ]
      //     },
      //     {
      //         "id": 0,
      //         "name": "Видеоконтроль",
      //         "tools": [
      //             {
      //                 "id": 36,
      //                 "name": "Macbook Pro (ThunderBolt3)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 37,
      //                 "name": "Монитор режиссерский TVLogic 232/242",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 38,
      //                 "name": "Монитор режиссерский Sony LDM-A240 10 bit",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 39,
      //                 "name": "Монитор режиссерский Osee",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 40,
      //                 "name": "Монитор операторский Flanders DM 220 OLED",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 41,
      //                 "name": "Монитор-рекордер Atomos Sumo 19\"",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 42,
      //                 "name": "Монитор клиентский 65\"",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 43,
      //                 "name": "Монитор в клетке TvLogic-f7 mk 2",
      //                 "amount": "1",
      //                 "quantity": "2",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 44,
      //                 "name": "Hollyland Cosmo 1000+/аналог TX",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 45,
      //                 "name": "Hollyland Cosmo 1000+/аналог RX",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 46,
      //                 "name": "AJA IO XT/Blackmagic UltraStudio",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 47,
      //                 "name": "AJA U-Tab",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 48,
      //                 "name": "Монитор в клетке SmallHD 702",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 49,
      //                 "name": "Монитор в клетке TvLogic-f5a",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 50,
      //                 "name": "Монитор-рекордер в клетке BlackMagic 7",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 51,
      //                 "name": "Монитор  со встроенным приемником Vaxis Cine 8",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 52,
      //                 "name": "SDI Квадратор 4CH",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 53,
      //                 "name": "SDI Квадратор 16CH",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             },
      //             {
      //                 "id": 54,
      //                 "name": "Screen Port SDI +",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 4,
      //                 "services": []
      //             }
      //         ]
      //     },
      //     {
      //         "id": 0,
      //         "name": "Оптика",
      //         "tools": [
      //             {
      //                 "id": 55,
      //                 "name": "ARRI/ZEISS High Speed mk1/mk2/mk3 T1.4 PL (18,25,35,50,85) ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 56,
      //                 "name": "ARRI Ultra Prime T2.8/2 PL - (8,12) ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 57,
      //                 "name": "ARRI Ultra Prime T1.9 PL (16,24,40,65,85,100,135) ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 58,
      //                 "name": "ARRI Master Prime/i T1.3 PL (14)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 59,
      //                 "name": "ARRI Master Prime/i  T1.3 PL  (16,18,21,25,27,32,35,40,50,65,75,100,135,150)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 60,
      //                 "name": "ARRI Singnature Prime/i T1.8 (15) T1.8 LPL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 61,
      //                 "name": "ARRI Singnature Prime/i T1.8 LPL (12,15,18,21,25,29,35,40,47,58,75,95)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 62,
      //                 "name": "BlackWing TRIBE7 (20,7;27;37;47)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 63,
      //                 "name": "Gecko-cam Genesis G35 T1.4 PL (14.5,16,20,25,35,50,85m,135)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 64,
      //                 "name": "Cooke Panchro/i T2.2 PL (18,21,25,27,32,40,50,75,100,135) ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 65,
      //                 "name": "Cooke Panchro/i T2.2 FF PL (25,32,50,65,75,135) REDPRIME",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 66,
      //                 "name": "Cooke S4/i T2 PL (12,14,16,18,21,25,27,32,35,40,50,65,75,100,135)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 67,
      //                 "name": "Cooke S5/i T1.4 PL (18,25,32,40,50,65,75,100,135) ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 68,
      //                 "name": "Cooke S7/i T2 PL (16,18,21,25,27,32,40,50,65,75,100,135) ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 69,
      //                 "name": "Hanse Inno Tech Celere T1.5 PL (18.5;25;36;50;85) ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 70,
      //                 "name": "IRONGLASS FF set PL (20;28;37;58;85;135)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 71,
      //                 "name": "Leitz Summilux-C T1.4 PL (16,18,21,25,29,35,40,50,65,75,100,135)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 72,
      //                 "name": "Leitz Elsie T2.1 LPL FF (21,25,35,50,75,100)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 73,
      //                 "name": "Zeiss Suprime Prime/i T1.4 PL (18,21,25,29,35,40,50,65,85,100,135)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 74,
      //                 "name": "Sigma FF HS PL T1.5 (14,20,24,28,40,50,85)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 75,
      //                 "name": "ARRI Master Anamorphic T2.9 PL (28,35,40,50,60,75,100,135,180)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 76,
      //                 "name": "Hawk Anamorphic C-series Set T2.2 PL (24,5;35;50;75;100)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 77,
      //                 "name": "Orion Atlas Anamorphic T2 PL (25,32,40,50,65,80,100)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 78,
      //                 "name": "Cooke Anamorphic/i T2.3 PL (25,32,40,50,65,75,100,135,180)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 79,
      //                 "name": "ARRI/Fujinon 18-80 mm T2.6 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 80,
      //                 "name": "ARRI/Fujinon 45-250 mm T2.6 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 81,
      //                 "name": "Angenieux EZ-1 S35 T2 PL (30-90)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 82,
      //                 "name": "Angenieux EZ-2 S35 T2 PL (15-40)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 83,
      //                 "name": "Angenieux EZ-1 FF T3 PL (45-135)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 84,
      //                 "name": "Angenieux EZ-2 FF T3 PL (22-60)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 85,
      //                 "name": "Fujinon Premista/i 19-45 T2.9 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 86,
      //                 "name": "Fujinon Premista/i 28-100 T2.9 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 87,
      //                 "name": "Fujinon Premista/i 80-250 T2.9 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 88,
      //                 "name": "Angenieux Optimo 25-250 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 89,
      //                 "name": "Angenieux Optimo 24-290mm T2.8 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 90,
      //                 "name": "Tokina 11-20 T2.9 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 91,
      //                 "name": "LOMO zoom 20-120",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 92,
      //                 "name": "Canon S16 zoom 11.5-138 T2.5 PL ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 93,
      //                 "name": "Canon s16 T1.6 10-120  PL ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 94,
      //                 "name": "Fuji S16 T1.7 9-126 PL 2x",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 95,
      //                 "name": "Vintage 50mm Macro F2.8 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 96,
      //                 "name": "ARRI Master Prime Macro 100mm",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 97,
      //                 "name": "Tokina 100 mm T2.9 PL Macro",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 98,
      //                 "name": "Laowa 24mm Macro Probe F14 PL ver.2",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 99,
      //                 "name": "Laowa 24mm Macro Probe T8 PL ver.3",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 100,
      //                 "name": "Laowa 12мм Zero-D T2.9 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 101,
      //                 "name": "Zeiss Standart Prime 12мм ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 102,
      //                 "name": "Kinoptik 9.8 mm F1.8 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 103,
      //                 "name": "Belomo 8mm S16 F3.5 PL",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 104,
      //                 "name": "P+S Technik Skater Scope",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             },
      //             {
      //                 "id": 105,
      //                 "name": "Exstender IBE Optics x2",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 5,
      //                 "services": []
      //             }
      //         ]
      //     },
      //     {
      //         "id": 0,
      //         "name": "Фильтры",
      //         "tools": [
      //             {
      //                 "id": 106,
      //                 "name": "Clear",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 107,
      //                 "name": "IR ND (0.3-0.6)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 108,
      //                 "name": "IR ND (0.3-2.1)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 109,
      //                 "name": "Rota pola",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 110,
      //                 "name": "Grad ND SEHE (.3-.9)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 111,
      //                 "name": "Black Promist (1;1/2;1/4; 1/8)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 112,
      //                 "name": "Black Satin (1/4; 1/8)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 113,
      //                 "name": "Hollywood Black Magic (1;1/2;1/4;1/8)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 114,
      //                 "name": "Glimmer Glass (1;1/2;1/4;1/8)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 115,
      //                 "name": "Pearlescent (1;1/2;1/4;1/8)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 116,
      //                 "name": "Diopter set(+1/2;+1;+2)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 117,
      //                 "name": "Master Diopter set/аналог(+1/2;+1;+2;+3)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 118,
      //                 "name": "Split Diopter set(+1/2;+1;+2)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             },
      //             {
      //                 "id": 119,
      //                 "name": "Flarestick Set",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 6,
      //                 "services": []
      //             }
      //         ]
      //     },
      //     {
      //         "id": 0,
      //         "name": "Дополнительное оборудование",
      //         "tools": [
      //             {
      //                 "id": 120,
      //                 "name": "Радиофокус ARRI WCU-4",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 121,
      //                 "name": "Радиофокус ARRI SXU-1",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 122,
      //                 "name": "Мотор радиофокуса ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 123,
      //                 "name": "Радиофокус Tilta Nucleus-M",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 124,
      //                 "name": "DANA DOLLY/аналог",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 125,
      //                 "name": "Мотор слайдера(Timelaps)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 126,
      //                 "name": "P+S Technik Skater Mini Dolly",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 127,
      //                 "name": "Стабилизатор DJI Ronin 2",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 128,
      //                 "name": "Быстросьемы",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 129,
      //                 "name": "ForcePro ",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 130,
      //                 "name": "Стабилизатор MoviPro",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 131,
      //                 "name": "Стабилизатор DJI RS3",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 132,
      //                 "name": "Easyrig 3.0",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 133,
      //                 "name": "Easyrig with Flowcine Serene Kit",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 134,
      //                 "name": "Easyrig Stabil",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 135,
      //                 "name": "Ready Rig",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 136,
      //                 "name": "Mugliner",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 137,
      //                 "name": "Hollyland Solidcom C1 set (6pcs,no base)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 138,
      //                 "name": "Hollyland Solidcom C1 set (8pcs no base)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 139,
      //                 "name": "Рации Kenwood/Baofeng TK-F6",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 140,
      //                 "name": "C-stand + monitor stand + VESA mount",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 141,
      //                 "name": "Рюкзак-разгрузка для камеры",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 142,
      //                 "name": "Разгрузка для камеры (FocusPokus)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 143,
      //                 "name": "CineSaddle",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 144,
      //                 "name": "Manfrotto Fig Rig",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 145,
      //                 "name": "Segway Ninebot S miniPRO",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             },
      //             {
      //                 "id": 146,
      //                 "name": "Расходные материалы (Воздух, Чистящая жидкость, Салфетки)",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 7,
      //                 "services": []
      //             }
      //         ]
      //     },
      //     {
      //         "id": 0,
      //         "name": "ОБСЛУЖИВАНИЕ",
      //         "tools": [
      //             {
      //                 "id": 147,
      //                 "name": "1stAC (Механик-фокуспуллер)[10 ч. по площадке]",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 8,
      //                 "services": [
      //                     {
      //                         "id": 1,
      //                         "name": "Погрузка|Разгрузка",
      //                         "amount": "1",
      //                         "quantity": "1",
      //                         "tool": 147
      //                     },
      //                     {
      //                         "id": 2,
      //                         "name": "Переработка час.",
      //                         "amount": "1",
      //                         "quantity": "1",
      //                         "tool": 147
      //                     }
      //                 ]
      //             },
      //             {
      //                 "id": 148,
      //                 "name": "2ndAC (Механик Камеры/Гимбла/Плейбекер-Логер)[10 ч. по площадке]",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 8,
      //                 "services": [
      //                     {
      //                         "id": 3,
      //                         "name": "Погрузка|Разгрузка.",
      //                         "amount": "1",
      //                         "quantity": "1",
      //                         "tool": 148
      //                     },
      //                     {
      //                         "id": 4,
      //                         "name": "Настройка и ведение стрим трансляции",
      //                         "amount": "1",
      //                         "quantity": "1",
      //                         "tool": 148
      //                     },
      //                     {
      //                         "id": 5,
      //                         "name": "Переработка час.",
      //                         "amount": "1",
      //                         "quantity": "1",
      //                         "tool": 148
      //                     }
      //                 ]
      //             },
      //             {
      //                 "id": 149,
      //                 "name": "Камерваген [12 ч. с базы по базу]",
      //                 "amount": "1",
      //                 "quantity": "1",
      //                 "section": 8,
      //                 "services": [
      //                     {
      //                         "id": 6,
      //                         "name": "Переработка час.",
      //                         "amount": "1",
      //                         "quantity": "1",
      //                         "tool": 149
      //                     },
      //                     {
      //                         "id": 7,
      //                         "name": "Прогон за МКАД",
      //                         "amount": "1",
      //                         "quantity": "1",
      //                         "tool": 149
      //                     }
      //                 ]
      //             }
      //         ]
      //     }
      //   ]
    // }
  console.log("pattern in estimate pop up", pattern);

  useEffect(() => {
    if (pattern && estimateData) {
      console.log('Pattern data:', pattern);
      console.log('Project estimate data:', estimateData);
    }
  }, [pattern, estimateData]);

  const handleSave = () => {
    console.log('Saving estimate for project:', project.id);
    // TODO: Implement save functionality
    onClose();
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
              return<>
                <tr className="estimate-popup__group-header">
                  <td colSpan="7">{section.name}</td>
                </tr>
                {section.tools.map((tool, index) => {
                  const days = getToolValue(tool.id, 'days', 1);
                  const discount = getToolValue(tool.id, 'discount', 0);
                  const total = tool.amount * tool.quantity * days;
                  const totalWithDiscount = Number((total * (1 - discount / 100)).toFixed(2));
                  
                  return <>
                    <tr key={`tool-${tool.id}`}>
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

        <EstimateSummary sections={estimateData.sections} />

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