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
      <input
        type="text"
        min={(
          time === 'hour'
            ? 1
            : 0
        )}
        max={(
          time === 'hour'
            ? 12
            : 59
        )}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
