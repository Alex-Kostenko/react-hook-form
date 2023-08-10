import { useFormContext } from 'react-hook-form';

const PassWordInput = ({ rules }: Irules) => {
  const { formState, ...props } = useFormContext();

  const { errors } = formState;

  return (
    <label>
      Password
      <input type="password" {...rules} />
      {errors.password && (
        <p style={{ color: 'red' }}>{String(errors.password.message)}</p>
      )}
    </label>
  );
};

export { PassWordInput };
