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
            if (index === 0) {
              return ((
                <option
                  key="12"
                  value="12"
                >
                  12
                </option>
              ));
            }

            if (index < 10) {
              const number = `0${index}`;
              return ((
                <option
                  key={number}
                  value={number}
                >
                  {number}
                </option>
              ));
            }

            const number = index.toString();
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
          Array(6).fill(0).map((_, index) => {
            const number = index === 0
              ? '00'
              : (index * 10).toString();
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
