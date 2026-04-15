import React, { useState, useRef } from "react";
import axios from "axios";

const FileUpload = ({ setData }) => {
  const [file, setFile]         = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  /* ── ALL original logic unchanged ── */
  const handleUpload = async () => {
    if (!file) { alert("Please select a file"); return; }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ── drag helpers (UI only) ── */
  const onDrop    = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); };
  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave= ()  => setDragging(false);

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid rgba(99,102,241,0.12)" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", background: "linear-gradient(90deg,rgba(239,246,255,0.8),rgba(240,253,250,0.8))" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#34d399,#059669)" }}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Import Data</h2>
          <p className="text-xs text-slate-400 mt-0.5">Upload a CSV file to start your analysis</p>
        </div>
        {file && (
          <button onClick={() => setFile(null)}
            className="ml-auto text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50">
            ✕ Clear
          </button>
        )}
      </div>

      <div className="px-6 py-5">
        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
          className="flex flex-col items-center justify-center py-10 rounded-xl cursor-pointer transition-all duration-200"
          style={dragging
            ? { border: "2px dashed #4f8ef7", background: "rgba(79,142,247,0.06)" }
            : file
              ? { border: "2px dashed #34d399", background: "rgba(52,211,153,0.05)" }
              : { border: "2px dashed #e2e8f0", background: "#fafbff" }}>

          <input ref={inputRef} type="file" accept=".csv"
            onChange={e => setFile(e.target.files[0])} className="hidden" />

          {file ? (
            /* File selected state */
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#d1fae5,#a7f3d0)" }}>
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-700">{file.name}</p>
              <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB · Click to replace</p>
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
                style={{ background: dragging ? "rgba(79,142,247,0.12)" : "#f1f5f9" }}>
                <svg className="w-7 h-7" style={{ color: dragging ? "#4f8ef7" : "#94a3b8" }}
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-600">
                  {dragging ? "Drop your file here" : "Drag & drop or click to browse"}
                </p>
                <p className="text-xs text-slate-400 mt-1">Supports CSV files only · Max 50 MB</p>
              </div>
            </div>
          )}
        </div>

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="mt-4 w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-150"
          style={file && !uploading
            ? { background: "linear-gradient(135deg,#34d399,#059669)", boxShadow: "0 4px 14px rgba(5,150,105,0.3)", cursor: "pointer" }
            : { background: "#e2e8f0", color: "#94a3b8", cursor: "not-allowed", boxShadow: "none" }}>
          {uploading
            ? <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Uploading & Parsing…
              </>
            : <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload & Analyze
              </>
          }
        </button>
      </div>
    </div>
  );
};

export default FileUpload;