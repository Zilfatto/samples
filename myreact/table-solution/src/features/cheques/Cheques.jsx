import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChequeModal from '../chequeModal/ChequeModal';
import { Table, Button } from 'antd';
import { selectCheques } from '../cheques/ChequesSlice';
import { chequeRemoved } from './ChequesSlice';

const VideoSearch = () => {
  const dispatch = useDispatch();
  const cheques = useSelector(selectCheques);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      title: 'Дата покупки',
      dataIndex: 'dateReg',
      key: 'dateReg',
      render: iso => new Date(iso).toLocaleString()
    },
    {
      title: 'Киоск',
      dataIndex: 'kioskName',
      key: 'kioskName'
    },
    {
      title: 'Тип',
      dataIndex: 'chequeType',
      key: 'chequeType',
      render: type => type ? 'Возврат' : 'Продажа'
    },
    {
      title: 'Статус оплаты',
      dataIndex: 'payStatus',
      key: 'payStatus',
      render: ({ pays, sum }) => {
        if (!pays[0]) return 'Нет оплаты';
        const result = pays.reduce((total, pay) => total + pay.sum, 0);
        return result === sum ? 'Оплачено' : 'Недоплата';
      }
    },
    {
      title: 'Оплата',
      dataIndex: 'pays',
      key: 'pays',
      render: pays => {
        if (!pays[0]) return '0';
        return pays.reduce((total, pay) => total + pay.sum, 0);
      }
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum'
    },
    {
      title: 'Кол-во товара',
      dataIndex: 'quantity',
      key: 'quantity',
      render: positions => positions.map((position, index) => <p key={index}>{position.quantity}</p>)
    },
    {
      title: 'Товары',
      dataIndex: 'name',
      key: 'name',
      render: positions => positions.map((position, index) => <p key={index}>{position.name}</p>)
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: id => <Button danger onClick={() => dispatch(chequeRemoved(id))}>Delete</Button>
    }
  ];

  const data = cheques.map(cheque => {
    const {
      uid: key,
      dateReg,
      kioskName,
      chequeType,
      pays,
      sum,
      positions
    } = cheque;

    return {
      key,
      dateReg,
      kioskName,
      chequeType,
      payStatus: { pays, sum },
      pays,
      sum,
      quantity: positions,
      name: positions,
      delete: key
    };
  });

  return (
    <div className="container-fluid">
      <Table columns={columns} dataSource={data} />
      <Button type="primary" onClick={() => setModalVisible(true)}>Добавить чек</Button>
      <ChequeModal
        title="Сохранить чек"
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
}

export default VideoSearch;