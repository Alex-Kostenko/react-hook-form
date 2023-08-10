import { useFormContext } from 'react-hook-form';

const NumberInput = ({ rules }: Irules) => {
  const { formState } = useFormContext();

  const { errors } = formState;

  return (
    <label>
      Number
      <input type="number" {...rules} />
      {errors.numberInput && (
        <p style={{ color: 'red' }}>{String(errors.numberInput.message)}</p>
      )}
    </label>
  );
};

export { NumberInput };
