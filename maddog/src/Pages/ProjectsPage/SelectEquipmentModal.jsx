import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Table, Pagination, Button } from 'antd';
import { getAllEquipment } from '../../actions/equipmentApi';
import { setListPage } from '../../redux/features/equipmentSlice';
import { addSelectedEquipment, removeSelectedEquipment } from '../../redux/features/projectsSlice';
import { updateProjectById } from '../../actions/projectsApi';
import './SelectEquipmentModal.scss';

function SelectEquipmentModal({ isOpen, onClose, projectId }) {
  const dispatch = useDispatch();
  const equipmentList = useSelector((state) => state.equipment.equipmentList);
  const { page, size, totalPages } = useSelector((state) => state.equipment.listPage);
  const selectedEquipment = useSelector((state) => state.projects.selectedEquipment);

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllEquipment());
    }
  }, [dispatch, page, size, isOpen]);

  const handlePageChange = (newPage) => {
    dispatch(setListPage({ page: newPage - 1, size }));
  };

  const handleAttachEquipment = () => {
    if (projectId) {
      dispatch(updateProjectById({ 
        id: projectId, 
        tools: selectedEquipment.map(eq => eq.id)
      }))
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error('Failed to attach equipment:', error);
        });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    }
  ];

  const handleRowClick = (record, e) => {
    e.stopPropagation();
    const isSelected = selectedEquipment.some(eq => eq.id === record.id);
    if (isSelected) {
      dispatch(removeSelectedEquipment(record));
    } else {
      dispatch(addSelectedEquipment(record));
    }
  };

  const rowClassName = (record) => {
    return selectedEquipment.some(eq => eq.id === record.id) 
      ? 'ant-table-row--selected'
      : '';
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      title={<div className="equipment-modal__title">Select Equipment</div>}
      open={isOpen}
      onCancel={onClose}
      width={800}
      modalRender={(modal) => (
        <div onClick={handleModalClick} className="equipment-modal">
          {modal}
        </div>
      )}
      footer={[
        <div key="footer" className="equipment-modal__footer">
          <div className="equipment-modal__pagination">
            <Pagination
              current={page + 1}
              total={totalPages * size}
              pageSize={size}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
          {projectId && (
            <Button 
              key="attach"
              type="primary"
              onClick={handleAttachEquipment}
              className="equipment-modal__attach-btn"
            >
              Прикрепить
            </Button>
          )}
        </div>
      ]}
    >
      <div className="equipment-modal__table">
        <Table
          dataSource={equipmentList}
          columns={columns}
          pagination={false}
          rowKey="id"
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record, e),
          })}
          rowClassName={rowClassName}
        />
      </div>
    </Modal>
  );
}

export default SelectEquipmentModal; 