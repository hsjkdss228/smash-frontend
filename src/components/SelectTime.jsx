export default function SelectTime({
  id,
  onChange,
  type,
  time,
}) {
  return (
    <div>
      <label htmlFor={id}>
        {type}
        {' '}
        {time}
      </label>
      <select
        id={id}
        onChange={onChange}
      >
        <option
          defaultValue
          disabled
          hidden
        >
          선택
        </option>
        {time === 'hour' ? (
          Array(12).fill(0).map((_, index) => {
            const value = index + 1 < 10
              ? `0${index + 1}`
              : (index + 1).toString();
            return ((
              <option key={value}>
                {value}
              </option>
            ));
          })
        ) : (
          Array(60).fill(0).map((_, index) => {
            const value = index < 10
              ? `0${index}`
              : index.toString();
            return ((
              <option key={value}>
                {value}
              </option>
            ));
          })
        )}
      </select>
    </div>
  );
}
