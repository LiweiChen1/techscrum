/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IMinEvent, IOptions } from '../../../types';
import { getErrorMessage } from '../../../utils/formUtils';
import styles from '../FormV2.module.scss';
import defaultStyles from './DropdownV2.module.scss';

interface IDropdownV2 {
  onValueChanged: (e: IMinEvent) => void;
  onValueBlur?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  defaultValue?: string | null;
  name: string;
  options: IOptions[];
  label: string;
  required?: boolean;
  placeHolder?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  dataTestId?: string;
}

export default function DropdownV2(props: IDropdownV2) {
  const {
    defaultValue,
    name,
    label,
    placeHolder,
    type = 'button',
    required,
    options,
    onValueChanged,
    onValueBlur = null,
    loading = false,
    dataTestId
  } = props;
  const defaultPlaceHolder = placeHolder ?? 'None';
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<null | string>(null);
  const [isActive, setIsActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const finalValue = options?.filter((item) => item.value === value)[0]?.label;

  useEffect(() => {
    if (value === null && defaultValue) {
      setValue(defaultValue);
    }
  }, [value, defaultValue]);

  const onChangeSelect = (val: string) => {
    const e = { target: { value: val, name } };
    const errorMessage = getErrorMessage(e, props);
    setError(errorMessage);
    setValue(e.target.value);
    onValueChanged(e);
    setShowMenu(false);
    setIsActive(false);
  };

  const onBlurValue = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (onValueBlur) {
      onValueBlur(e);
    }
    const errorMessage = getErrorMessage(e, props);
    setError(errorMessage);
    setIsActive(false);
  };

  if (loading) {
    return <div className={styles.skeleton} />;
  }

  const renderDropdown = () => {
    return (
      showMenu && (
        <div className="relative">
          <div className={defaultStyles.dropDownList}>
            {options.length > 0 &&
              options
                .filter((item) => item.value !== value)
                .map((item) => {
                  return (
                    <button
                      key={item.value}
                      onClick={() => onChangeSelect(item.value)}
                      data-testid={`leader-name-${item.label}`}
                    >
                      {item.label}
                    </button>
                  );
                })}
          </div>
        </div>
      )
    );
  };

  return (
    <div
      className={[
        'relative',
        styles.inputContainer,
        isActive ? styles.borderActive : '',
        error ? styles.borderRed : ''
      ].join(' ')}
      data-testid={dataTestId}
    >
      <div
        onClick={() => {
          setShowMenu(!showMenu);
          setIsActive(true);
        }}
      >
        <label
          className={[
            styles.label,
            error ? styles.errorRed : '',
            isActive ? styles.active : ''
          ].join(' ')}
          htmlFor={name}
        >
          {label}
          {required ? <span className={styles.errorRed}>*</span> : ''}
        </label>
        <button
          type={type}
          className={[styles.input, !value ? styles.lightGrey : ''].join(' ')}
          onBlur={onBlurValue}
        >
          <p className={!finalValue ? defaultStyles.placeHolder : defaultStyles.val}>
            {!finalValue ? defaultPlaceHolder : finalValue}
          </p>
        </button>
        <RiArrowDropDownLine className={defaultStyles.dropDown} />

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      {renderDropdown()}
    </div>
  );
}

DropdownV2.defaultProps = {
  required: false,
  placeHolder: '',
  type: 'button',
  onValueBlur: null,
  defaultValue: null,
  loading: false,
  dataTestId: null
};
