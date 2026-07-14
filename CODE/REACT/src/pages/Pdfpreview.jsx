import { useNavigate } from "react-router-dom";
import Pdfviewer from "../component/Pdfviewer";

export default function PdfPreview() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          width: "100%",
          padding: "4px",
          cursor: "pointer",
          color: "black",
          backgroundColor: "#d9a441",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ← Back
      </button>

      <Pdfviewer file="/laplace.pdf" />
    </div>
  );
}