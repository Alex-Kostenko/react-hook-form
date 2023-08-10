const RangeInput = ({ rules }: Irules) => {
  return (
    <label>
      Range
      <input type="range" {...rules} />
    </label>
  );
};

export { RangeInput };
