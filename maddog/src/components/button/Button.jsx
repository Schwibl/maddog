export default function Button(props) {
  const { className, onClick, type, value, name, children } = props;
  return (
    <button className={className} onClick={onClick} type={type} value={value} name={name}>
      {children}
    </button>
  );
}