import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Input, InputNumber, Button } from 'antd';
import { chequeAdded } from '../cheques/ChequesSlice';
import { toast } from 'react-toastify';
import {
  chequeModalKioskNameChanged,
  chequeModalChequeTypeChanged,
  chequeModalPaySumChanged,
  chequeModalPayAdded,
  chequeModalPayRemoved,
  chequeModalSumChanged,
  chequeModalPositionAdded,
  chequeModalPositionRemoved,
  chequeModalPositionNameChanged,
  chequeModalPositionQuantityChanged,
  chequeModalPositionPriceChanged,
  chequeModalReset,
  selectChequeModal
} from './chequeModalSlice';

const SearchModal = ({ closeModal, ...restProps }) => {
  const dispatch = useDispatch();
  const chequeModal = useSelector(selectChequeModal);
  const [remainder, setRemainder] = useState(0);
  const { Option } = Select;
  const {
    kioskName,
    chequeType,
    sum,
    pays,
    positions
  } = chequeModal;

  const calculateSum = () => {
    let newSum;
    if (!positions[0]) newSum = 0;
    else {
      newSum = positions.reduce((total, position) => total + position.quantity * position.price, 0);
    }
    dispatch(chequeModalSumChanged(newSum));
  };

  const calculateRemainder = () => {
    if (!pays[0]) return sum;
    return pays.reduce((total, pay) => total - pay.sum, sum);
  };

  useEffect(() => {
    calculateSum();
  }, [positions]);

  useEffect(() => {
    const newRemainder = calculateRemainder();
    setRemainder(newRemainder);
  }, [positions, pays]);

  const handleKioskNameInput = (e) => {
    const { value } = e.target;
    dispatch(chequeModalKioskNameChanged(value));
  };

  const handlePositionNameChange = ({ index, e }) => {
    const { value: name } = e.target;
    dispatch(chequeModalPositionNameChanged({ index, name }))
  };

  const handleChequeSave = () => {
    // Validation
    if (!kioskName) return toast.error('Укажите название киоска');
    else if (!positions.every((position) => position.name && position.price && position.quantity))
      return toast.error('Один из товаров неверно заполнен');

    dispatch(chequeAdded(chequeModal));
    toast('Чек добавлен!');
    closeModal();
    dispatch(chequeModalReset());
  };

  return (
    <Modal
      onOk={handleChequeSave}
      {...restProps}
      centered
    >
      <span className="input-label">Киоск</span>
      <Input
        placeholder="Название киоска"
        onChange={handleKioskNameInput}
        value={kioskName}
      />
      <span className="input-label">Тип</span>
      <Select
        style={{ width: '100%' }}
        defaultValue={chequeType.toString()}
        optionFilterProp="children"
        onChange={(value) => dispatch(chequeModalChequeTypeChanged(Number(value)))}
      >
        <Option value="0">Продажа</Option>
        <Option value="1">Возврат</Option>
      </Select>
      <span className="input-label">Сумма</span>
      <Input
        value={sum}
        disabled={true}
      />

      <div className="positions-container">
        <Button type="primary" onClick={() => dispatch(chequeModalPositionAdded())}>Добавить товар</Button>
        {positions.map((position, index) => (
          <div key={index} className="position">
            <span className="input-label">Товар</span>
            <Input
              placeholder="Название товара"
              value={position.name}
              onChange={e => handlePositionNameChange({ index, e })}
            />
            <span className="input-label">Цена</span>
            <InputNumber
              min={0}
              max={1000000}
              style={{ margin: '0 16px' }}
              value={position.price}
              onChange={(price) => dispatch(chequeModalPositionPriceChanged({ index, price }))}
            />
            <span className="input-label">Количество</span>
            <InputNumber
              min={0}
              max={1000}
              style={{ margin: '0 16px' }}
              value={position.quantity}
              onChange={(quantity) => dispatch(chequeModalPositionQuantityChanged({ index, quantity }))}
            />
            <Button danger onClick={() => dispatch(chequeModalPositionRemoved(index))}>Удалить</Button>
          </div>
        ))}
      </div>
      <div className="pays-container">
        <Button type="primary" disabled={remainder <= 0} onClick={() => dispatch(chequeModalPayAdded())}>Добавить оплату</Button>
        {pays.map(pay => (
          <div key={pay.uid} className="pay">
            <span className="input-label">Оплата</span>
            <InputNumber
              min={1}
              max={pay.sum === 1 ? remainder : pay.sum}
              style={{ margin: '0 16px' }}
              value={pay.sum}
              onChange={(sum) => dispatch(chequeModalPaySumChanged({ sum, uid: pay.uid }))}
            />
            <Button danger onClick={() => dispatch(chequeModalPayRemoved(pay.uid))}>Удалить</Button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default SearchModal;