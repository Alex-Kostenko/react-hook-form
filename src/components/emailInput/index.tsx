import { useFormContext } from 'react-hook-form';

const EmailInput = ({ rules }: Irules) => {
  const { formState } = useFormContext();

  const { errors } = formState;

  return (
    <label>
      Email
      <input type="email" {...rules} />
      {errors.emailInput && (
        <p style={{ color: 'red' }}>{String(errors.emailInput.message)}</p>
      )}
    </label>
  );
};

export { EmailInput };
