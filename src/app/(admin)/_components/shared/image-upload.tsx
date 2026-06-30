"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "../../_lib/cn";

interface ImageUploadProps {
  name: string;
  label?: string;
  currentImageUrl?: string | null;
  currentImageId?: number | null;
  onRemove?: () => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

async function uploadToStrapi(file: File): Promise<{ id: number; url: string }> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Upload failed");
  return json;
}

// ── Multiple image uploader ──────────────────────────────────────────────────
function MultiImageUpload({ name, accept, className }: Pick<ImageUploadProps, "name" | "accept" | "className">) {
  const [uploads, setUploads] = useState<{ id: number; preview: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);
    try {
      const uploaded = await uploadToStrapi(file);
      setUploads((prev) => [...prev, { id: uploaded.id, preview: URL.createObjectURL(file) }]);
      // Reset file input so the same file can be re-selected if needed
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }, []);

  return (
    <div className={className}>
      {uploads.map((u) => (
        <input key={u.id} type="hidden" name={name} value={u.id} />
      ))}

      {uploads.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {uploads.map((u, i) => (
            <div key={u.id} className="relative">
              <img src={u.preview} alt="" className="h-20 w-20 rounded-md border object-cover" />
              <button
                type="button"
                onClick={() => setUploads((prev) => prev.filter((_, idx) => idx !== i))}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file && !isUploading) handleFile(file);
        }}
        className={cn(
          "flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-md cursor-pointer transition-colors",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
          isUploading && "pointer-events-none opacity-60"
        )}
      >
        <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
          {isUploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-xs">Uploading…</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-xs">Drop image or click to add{uploads.length > 0 ? " more" : ""}</span>
            </>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          className="hidden"
        />
      </label>

      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}

// ── Single image uploader ────────────────────────────────────────────────────
export function ImageUpload({
  name,
  label,
  currentImageUrl,
  currentImageId,
  onRemove,
  accept = "image/*",
  multiple = false,
  className,
}: ImageUploadProps) {
  if (multiple) {
    return <MultiImageUpload name={name} accept={accept} className={className} />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadedId, setUploadedId] = useState<number | null>(currentImageId ?? null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDragOver, setIsDragOver] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isUploading, setIsUploading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadError, setUploadError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    setPreview(URL.createObjectURL(file));
    try {
      const uploaded = await uploadToStrapi(file);
      setUploadedId(uploaded.id);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setPreview(null);
      setUploadedId(null);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRemove = () => {
    setPreview(null);
    setUploadedId(null);
    setUploadError(null);
    onRemove?.();
  };

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium mb-1.5">{label}</label>}
      <input type="hidden" name={name} value={uploadedId ?? ""} />

      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="h-32 w-auto rounded-md border object-cover" />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
          {!isUploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className={cn(
            "flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors",
            isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-xs">Uploading…</span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8" />
                <span className="text-xs">Drop image here or click to browse</span>
              </>
            )}
          </div>
          <input
            type="file"
            accept={accept}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            className="hidden"
          />
        </label>
      )}

      {uploadError && <p className="text-destructive text-xs mt-1">{uploadError}</p>}
    </div>
  );
}
