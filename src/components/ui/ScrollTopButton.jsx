import { createPortal } from "react-dom";

export default function ScrollTopButton({ show }) {
  if (!show) return null;

  return createPortal(
    <button
      className="scroll-top"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    >
      ⬆
    </button>,
    document.getElementById("ui-root")
  );
}
