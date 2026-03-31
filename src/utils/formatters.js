/**
 * Returns Tailwind classes for a given file extension.
 */
export const getFileIconColor = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  if (ext === "pdf") return "text-red-400";
  if (["doc", "docx"].includes(ext)) return "text-blue-400";
  if (["xls", "xlsx"].includes(ext)) return "text-emerald-400";
  return "text-slate-400";
};

/**
 * Formats a byte count into a human-readable string.
 */
export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

/**
 * Formats a number with locale-appropriate thousands separators.
 */
export const formatNumber = (n) => Number(n).toLocaleString();

/**
 * Formats a dollar amount into a short form like "$4.2k" or "$1.2M".
 */
export const formatCurrency = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n}`;
};
