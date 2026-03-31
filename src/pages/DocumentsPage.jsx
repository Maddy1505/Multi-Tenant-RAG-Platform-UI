import { useState, useRef, useCallback } from "react";
import { Upload, FileText, Trash2, Eye, FolderOpen, Download, RefreshCw } from "lucide-react";

import StatusBadge from "../components/StatusBadge";
import { MOCK_DOCUMENTS } from "../data/mockData";
import { getFileIconColor, formatFileSize } from "../utils/formatters";

export default function DocumentsPage({ tenants }) {
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]?.id || 1);
  const [docs,           setDocs]           = useState(MOCK_DOCUMENTS);
  const [dragging,       setDragging]       = useState(false);
  const [uploading,      setUploading]      = useState(false);
  const fileRef = useRef();

  const tenantDocs = docs[selectedTenant] || [];

  const processFiles = useCallback((files) => {
    setUploading(true);
    setTimeout(() => {
      const newDocs = Array.from(files).map((f, i) => ({
        id:       Date.now() + i,
        name:     f.name,
        size:     formatFileSize(f.size),
        status:   "pending",
        uploaded: "just now",
        pages:    Math.floor(Math.random() * 50) + 5,
      }));
      if (newDocs.length) {
        setDocs(prev => ({
          ...prev,
          [selectedTenant]: [...(prev[selectedTenant] || []), ...newDocs],
        }));
      }
      setUploading(false);
    }, 1500);
  }, [selectedTenant]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer?.files || []);
  }, [processFiles]);

  const handleFileInput = (e) => {
    if (e.target.files?.length) processFiles(e.target.files);
    e.target.value = "";
  };

  const deleteDoc = (id) =>
    setDocs(prev => ({
      ...prev,
      [selectedTenant]: prev[selectedTenant].filter(d => d.id !== id),
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-sm text-slate-400 mt-1">Manage and process tenant documents</p>
        </div>
        <select
          value={selectedTenant}
          onChange={e => setSelectedTenant(Number(e.target.value))}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
        >
          {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-violet-400 bg-violet-500/10"
            : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/50"
        }`}
      >
        <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFileInput} />
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${dragging ? "bg-violet-500/20" : "bg-slate-800"}`}>
          {uploading
            ? <RefreshCw size={22} className="text-violet-400 animate-spin" />
            : <Upload    size={22} className={dragging ? "text-violet-400" : "text-slate-500"} />
          }
        </div>
        <p className="text-sm font-medium text-slate-300">
          {uploading ? "Processing upload…" : dragging ? "Drop files here" : "Drag & drop files, or click to browse"}
        </p>
        <p className="text-xs text-slate-500 mt-1">Supports PDF, DOCX, XLSX, TXT</p>
      </div>

      {/* File List */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <h2 className="font-medium text-white text-sm">{tenantDocs.length} Documents</h2>
          <Download size={14} className="text-slate-500" />
        </div>

        {tenantDocs.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            <FolderOpen size={32} className="mx-auto mb-3 opacity-30" />
            No documents yet. Upload your first file above.
          </div>
        ) : (
          <div className="divide-y divide-slate-700/30">
            {tenantDocs.map(doc => (
              <div key={doc.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-700/20 transition-colors group">
                <div className={`w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0 ${getFileIconColor(doc.name)}`}>
                  <FileText size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">{doc.name}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-500">{doc.size}</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{doc.pages} pages</span>
                    <span className="text-xs text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{doc.uploaded}</span>
                  </div>
                </div>
                <StatusBadge status={doc.status} />
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-7 h-7 rounded-lg hover:bg-blue-500/15 hover:text-blue-400 text-slate-500 flex items-center justify-center transition-colors">
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => deleteDoc(doc.id)}
                    className="w-7 h-7 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-slate-500 flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
