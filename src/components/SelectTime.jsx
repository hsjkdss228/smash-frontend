export default function SelectTime({
  id,
  onChange,
  type,
  time,
  value,
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
        value={value}
        onChange={onChange}
      >
        <option
          value=""
          disabled
          hidden
        >
          선택
        </option>
        {time === 'hour' ? (
          Array(12).fill(0).map((_, index) => {
            const number = index + 1 < 10
              ? `0${index + 1}`
              : (index + 1).toString();
            return ((
              <option
                key={number}
                value={number}
              >
                {number}
              </option>
            ));
          })
        ) : (
          Array(60).fill(0).map((_, index) => {
            const number = index < 10
              ? `0${index}`
              : index.toString();
            return ((
              <option
                key={number}
                value={number}
              >
                {number}
              </option>
            ));
          })
        )}
      </select>
    </div>
  );
}
