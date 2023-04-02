export function SelectList({ items, onSelect }) {
  return (
    <ul className="special-list">
      {items.map((item) => (
        <li key={item}>
          <button
            className="special-list-item"
            onClick={() => {
              onSelect(item);
            }}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function RemoveList({ items, onRemove }) {
  return (
    <ul className="special-list remove">
      {items.map((item) => (
        <li key={item}>
          <div className="special-list-item">{item}</div>
          <button
            onClick={() => {
              onRemove(item);
            }}
            className="remove-btn"
          >
            <img src="./images/icon-remove.svg" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function DottedList({ items }) {
  return (
    <ul className="dotted-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
