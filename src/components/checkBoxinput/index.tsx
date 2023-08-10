const CheckBoxInput = ({ rules }: Irules) => {
  return (
    <label>
      Check box
      <input type="checkbox" {...rules} />
    </label>
  );
};

export { CheckBoxInput };
