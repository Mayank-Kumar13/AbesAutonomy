export default function Pdfviewer({ file }) {
  return (
    <iframe
      src={`/pdfjs-6.1.200-dist/web/viewer.html?file=${encodeURIComponent(file)}`}
      width="100%"
      height="100%"
      style={{
        border: "none",
        minHeight: "100vh",
      }}
      title="PDF Viewer"
    />
  );
}