export default function Button(props) {
    const { className, type, value, name, children } = props;
    return (
      <button className={className} type={type} value={value} name={name}>
        {children}
      </button>
    );
}