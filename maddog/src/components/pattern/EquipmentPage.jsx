// import React, { useState, useEffect } from 'react';
// 
// import Pattern from './Pattern'; 
// 
// export default function EquipmentPage() {
//   const [equipmentList, setEquipmentList] = useState([]);
// 
//   useEffect(() => {
//     // Загрузка данных оборудования с сервера
//     const fetchEquipmentData = async () => {
//       const response = await fetch('/api/equipment');
//       const data = await response.json();
//       setEquipmentList(data);
//     };
// 
//     fetchEquipmentData();
//   }, []);
// 
//   return (
//     <div>
//       <h1>Оборудование</h1>
//       <Pattern equipmentList={equipmentList} />  {/* Отображаем оборудование */}
//     </div>
//   );
// }
