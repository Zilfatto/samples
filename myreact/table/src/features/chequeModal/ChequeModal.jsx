import React, { useMemo } from 'react';
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

  const calculateRemainder = sum => {
    if (!pays[0]) return sum;
    return pays.reduce((total, pay) => total - pay.sum, sum);
  };

  const sum = useMemo(() => calculateSum(), [positions]);
  const remainder = useMemo(() => calculateRemainder(sum), [pays, sum]);

  const handleKioskNameInput = e => {
    const { value } = e.target;
    dispatch(chequeModalKioskNameChanged(value));
  };

  const handlePositionNameChange = ({ index, e }) => {
    const { value: name } = e.target;
    dispatch(chequeModalPositionNameChanged({ index, name }))
  };

  const convertToInt = value => {
    if (!value) return value;
    if (typeof value === 'number') return Math.round(value);

    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) return null;
    return parsedValue;
  };

  const convertToFloat = value => {
    if (!value) return value;
    if (typeof value === 'number') return value.toFixed(2);

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) return null;
    return parsedValue.toFixed(2);
  };

  const calculateRestPaysSum = uid => {
    return pays.reduce((total, pay) => {
      if (pay.uid === uid) return total;
      return total + pay.sum;
    }, 0);
  };

  const computeMaxPay = (paySum, uid) => {
    if (remainder > 0) return paySum + remainder;

    else if (remainder === 0) return paySum;

    else return sum - calculateRestPaysSum(uid);
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
          value={sum.toFixed(2)}
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
                precision={2}
                onChange={price => dispatch(chequeModalPositionPriceChanged({ index, price: convertToFloat(price) }))}
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
        <Button type="primary" disabled={remainder <= 0} onClick={() => dispatch(chequeModalPayAdded())}>Добавить оплату</Button>
        {pays.map(pay => {
          const { sum: paySum, uid } = pay;
          return (
            <div key={uid} className="pay">
              <div className="position-row">
                <span className="input-label">Оплата</span>
                <InputNumber
                  min={1}
                  max={computeMaxPay(paySum, uid)}
                  style={{ margin: '0 16px' }}
                  value={paySum}
                  precision={2}
                  step={0.01}
                  onChange={newSum => dispatch(chequeModalPaySumChanged({ sum: convertToFloat(newSum), uid }))}
                />
              </div>
              <Button danger onClick={() => dispatch(chequeModalPayRemoved(uid))}>Удалить</Button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default SearchModal;