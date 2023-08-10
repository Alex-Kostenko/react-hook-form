import { FC } from 'react';
import { FieldError } from 'react-hook-form';
import Select from 'react-select';

interface ISelect {
  onChangeFunc: (...event: FieldError[]) => void;
  valueSelect: Icountry;
  errorSelect: FieldError | undefined;
}

const CustomSelect: FC<ISelect> = ({
  onChangeFunc,
  valueSelect,
  errorSelect,
}: any) => {
  const countryLeast: Icountry[] = [
    { value: 'franch', label: 'Franch' },
    { value: 'usa', label: 'USA' },
  ];

  return (
    <>
      <Select
        placeholder={'Countries'}
        options={countryLeast}
        value={valueSelect}
        onChange={(newValue) => {
          onChangeFunc(newValue);
        }}
      />
      {errorSelect && (
        <p style={{ color: 'red' }}>{String(errorSelect.message)}</p>
      )}
    </>
  );
};

export { CustomSelect };
