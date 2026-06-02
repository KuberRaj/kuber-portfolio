import { X, Download, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Pass the local worker directly from the installed package
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const ResumeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: { key: string }) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 🔹 Glassmorphic Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* 🔹 Deep Blue Glass Container */}
      <div
        className="relative w-full max-w-4xl h-[90vh] 
                      bg-slate-900/40 backdrop-blur-2xl 
                      border border-cyan-500/20 
                      rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)]
                      flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* 🔹 Glassmorphic Header Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-500/20 bg-blue-950/20 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-bold text-md tracking-wider uppercase">
              Kuber Raj Kunal
            </h3>
            {numPages && (
              <p className="text-[11px] font-medium text-blue-300/60 mt-0.5 tracking-wide">
                Page {pageNumber} of {numPages}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Download Button */}
            <a
              href="/Kuber_Raj_Kunal_Resume.pdf"
              download
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300 ease-out"
            >
              <Download size={14} />
              <span className="hidden sm:inline tracking-wide">Download</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="group relative p-1.5 rounded-lg text-blue-400 cursor-pointer bg-blue-500/5 border border-cyan-500/20 transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:text-cyan-300 hover:bg-blue-500/15 hover:border-blue-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <X
                size={18}
                className="transition-transform duration-300 ease-out group-hover:rotate-90"
              />
            </button>
          </div>
        </div>

        {/* 🔹 Canvas PDF Container */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-start bg-slate-950/10 custom-scrollbar">
          <Document
            file="/Kuber_Raj_Kunal_Resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center h-64 gap-3 text-cyan-400">
                <Loader2 className="animate-spin" size={32} />
                <span className="text-sm font-medium tracking-wider">
                  Loading PDF...
                </span>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-2xl border border-white/5 rounded-lg overflow-hidden max-w-full"
              width={Math.min(window.innerWidth * 0.85, 750)}
            />
          </Document>
        </div>

        {/* 🔹 Pagination Footer Controls (Only shows if document has multiple pages) */}
        {numPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-3 border-t border-cyan-500/10 bg-slate-950/30">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-xs text-slate-300 font-mono">
              {pageNumber} / {numPages}
            </span>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { ResumeModal };
