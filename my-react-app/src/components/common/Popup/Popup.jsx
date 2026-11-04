import "./Popup.css";
export default function Popup({ title, message, onConfirm, onCancel }) {
  return (
    <div className="popup-backdrop" role="presentation">
      <section className="popup surface" role="alertdialog" aria-modal="true">
        <h2>{title}</h2>
        <p>{message}</p>
        <div>
          <button className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="danger-button" onClick={onConfirm}>
            Delete event
          </button>
        </div>
      </section>
    </div>
  );
}
