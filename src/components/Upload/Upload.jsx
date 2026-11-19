import { useEffect, useRef, useState } from "react";
import { IoCheckmarkCircle, IoCloudUpload, IoDocument, IoTrash } from "react-icons/io5";
import Header from "../../Header";
import "./Upload.css";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function ProjectUpload() {
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList ?? []);
    if (!incoming.length) return;
    setStatus("idle");
    setFiles((prev) => [
      ...prev,
      ...incoming.map((file, index) => ({
        file,
        key: `${file.name}-${file.size}-${Date.now()}-${index}`,
      })),
    ]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleUpload = () => {
    setStatus("uploading");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus("done"), 900);
  };

  const removeFile = (key) => {
    setFiles((prev) => prev.filter((item) => item.key !== key));
    setStatus("idle");
  };

  return (
    <>
      <Header />

      <div className="page container">
        <div className="page-narrow fade-in">
          <div className="page-heading">
            <div>
              <h2 className="section-title">Proekt yuklash</h2>
              <p>Fayllaringizni tashlang yoki tanlang</p>
            </div>
          </div>

          <div
            className={`dropzone card ${dragging ? "is-dragging" : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragging(false);
            }}
          >
            <span className="dropzone__icon">
              <IoCloudUpload size={38} />
            </span>
            <h3>Fayllarni shu yerga tashlang</h3>
            <p className="muted">yoki pastdagi tugma yordamida tanlang</p>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Fayl tanlash
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {files.length > 0 && (
            <div className="upload-list card">
              <div className="upload-list__head">
                <h3>Tanlangan fayllar ({files.length})</h3>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => {
                    setFiles([]);
                    setStatus("idle");
                  }}
                >
                  <IoTrash size={17} /> Hammasini o'chirish
                </button>
              </div>

              <ul>
                {files.map(({ file, key }) => (
                  <li key={key}>
                    <span className="upload-list__icon">
                      <IoDocument size={20} />
                    </span>
                    <span className="upload-list__name" title={file.name}>
                      {file.name}
                    </span>
                    <span className="upload-list__size">
                      {formatSize(file.size)}
                    </span>
                    <button
                      type="button"
                      className="upload-list__remove"
                      onClick={() => removeFile(key)}
                      aria-label={`${file.name} ni o'chirish`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="btn btn--primary btn--block"
                onClick={handleUpload}
                disabled={status === "uploading"}
              >
                {status === "uploading" ? "Yuklanmoqda..." : "Yuklash"}
              </button>

              {status === "done" && (
                <p className="upload-success" role="status">
                  <IoCheckmarkCircle size={19} /> Fayllar muvaffaqiyatli yuklandi!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
