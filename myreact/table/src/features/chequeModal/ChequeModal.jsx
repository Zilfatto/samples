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
  // const [remainder, setRemainder] = useState(0);
  // const [sum, setSum] = useState(0);
  const [littleState, setLittleState] = useState({ sum: chequeModal.sum, remainder: 0 });
  const { Option } = Select;
  const {
    kioskName,
    chequeType,
    pays,
    positions
  } = chequeModal;

  const calculateSum = () => {
    if (!positions[0]) return 0;
    return positions.reduce((total, position) => total + position.quantity * position.price, 0);
  };

  const calculateRemainder = (sum) => {
    if (!pays[0]) return sum;
    return pays.reduce((total, pay) => total - pay.sum, sum);
  };

  useEffect(() => {
    const sum = calculateSum();
    const remainder = calculateRemainder(sum);
    setLittleState({ sum, remainder });
  }, [positions, pays]);

  const handleKioskNameInput = (e) => {
    const { value } = e.target;
    dispatch(chequeModalKioskNameChanged(value));
  };

  const handlePositionNameChange = ({ index, e }) => {
    const { value: name } = e.target;
    dispatch(chequeModalPositionNameChanged({ index, name }))
  };

  const convertToInt = (number) => {
    if (!number) return number;
    return Math.round(number)
  };

  const handleChequeSave = () => {
    // Validation
    if (!kioskName) return toast.error('Укажите название киоска');

    else if (!positions.every(position => position.name && position.price && position.quantity))
      return toast.error('Один из товаров неверно заполнен');

    else if (pays[0] && !pays.every(pay => pay.sum))
      return toast.error('Одна из оплат выполнена некорректно');

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
      {console.log('Rendered!')}
      <div className="modal-input-row">
        <span className="input-label">Киоск</span>
        <Input
          placeholder="Название киоска"
          onChange={handleKioskNameInput}
          value={kioskName}
        />
      </div>
      <div className="modal-input-row">
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
      </div>
      <div className="modal-input-row">
        <span className="input-label">Сумма</span>
        <Input
          value={littleState.sum}
          disabled={true}
        />
      </div>
      <div className="positions-container">
        <Button type="primary" onClick={() => dispatch(chequeModalPositionAdded())}>Добавить товар</Button>
        {positions.map((position, index) => (
          <div key={index} className="position">
            <div className="position-row">
              <span className="input-label">Товар</span>
              <Input
                placeholder="Название товара"
                value={position.name}
                onChange={e => handlePositionNameChange({ index, e })}
              />
            </div>
            <div className="position-row">
              <span className="input-label">Цена</span>
              <InputNumber
                min={1}
                max={1000000}
                style={{ margin: '0 16px' }}
                value={position.price}
                onChange={price => dispatch(chequeModalPositionPriceChanged({ index, price: convertToInt(price) }))}
              />
            </div>
            <div className="position-row">
              <span className="input-label">Количество</span>
              <InputNumber
                min={1}
                max={1000}
                style={{ margin: '0 16px' }}
                value={position.quantity}
                onChange={quantity => dispatch(chequeModalPositionQuantityChanged({ index, quantity: convertToInt(quantity) }))}
              />
            </div>
            <Button danger onClick={() => dispatch(chequeModalPositionRemoved(index))}>Удалить</Button>
          </div>
        ))}
      </div>
      <div className="pays-container">
        <Button type="primary" disabled={littleState.remainder <= 0} onClick={() => dispatch(chequeModalPayAdded())}>Добавить оплату</Button>
        {pays.map(pay => {
          const { sum } = pay;
          const { remainder } = littleState;
          return (
            <div key={pay.uid} className="pay">
              <div className="position-row">
                <span className="input-label">Оплата</span>
                <InputNumber
                  min={1}
                  max={remainder !== 0 ? sum + remainder : sum}
                  style={{ margin: '0 16px' }}
                  value={sum}
                  onChange={sum => dispatch(chequeModalPaySumChanged({ sum: convertToInt(sum), uid: pay.uid }))}
                />
              </div>
              <Button danger onClick={() => dispatch(chequeModalPayRemoved(pay.uid))}>Удалить</Button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default SearchModal;