import React, { useCallback, useState } from "react";
import RNPickerSelect from "react-native-picker-select";

import styles from "./styles";

interface Props {
  items: { label: string; value: string }[];
  placeholder: {
    label: string;
    value: string;
  };
  value?: any;
  onChange: (value: any, index: number) => void;
}

const SelectPicker: React.FC<Props> = ({
  items,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <RNPickerSelect
      placeholder={placeholder}
      style={{ ...styles }}
      onValueChange={onChange}
      items={items}
      value={value}
    />
  );
};

export default SelectPicker;
