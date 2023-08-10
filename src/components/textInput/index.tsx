import { useFormContext } from 'react-hook-form';

const TextInput = ({ rules }: Irules) => {
  const { formState } = useFormContext();

  const { errors } = formState;

  return (
    <label>
      Text Name
      <input {...rules} />
      {errors.textName && (
        <p style={{ color: 'red' }}>{String(errors.textName.message)}</p>
      )}
    </label>
  );
};

export { TextInput };
