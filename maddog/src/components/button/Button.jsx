export default function Button(props) {
    const { className, type, name, value, children } = props;
    return (
      <button className={className} type={type} name={name} value={value}>
        {children}
      </button>
    );
}