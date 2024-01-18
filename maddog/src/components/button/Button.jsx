export default function Button(props) {
  const { className, onClick, type, value, name, children, title } = props;
  return (
    <button className={className} onClick={onClick} type={type} value={value} name={name} title={title}>
      {children}
    </button>
  );
}