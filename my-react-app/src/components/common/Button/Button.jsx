import "./Button.css";
export default function Button({ children, variant = "primary", ...props }) {
  return (
    <button className={`cc-button ${variant}`} {...props}>
      {children}
    </button>
  );
}
