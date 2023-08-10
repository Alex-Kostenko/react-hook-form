const DateInput = ({ rules }: Irules) => {
  return (
    <label>
      Date
      <input type="date" {...rules} />
    </label>
  );
};

export { DateInput };
