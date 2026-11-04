import "./Input.css";
export default function Input({ label, id, ...props }) {
  return (
    <label className="cc-input" htmlFor={id}>
      {label}
      <input id={id} {...props} />
    </label>
  );
}
