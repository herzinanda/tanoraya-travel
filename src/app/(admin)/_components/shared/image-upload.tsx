"use client";

import { useState, useCallback } from "react";
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

export function ImageUpload({
  name,
  label,
  currentImageUrl,
  currentImageId,
  onRemove,
  accept = "image/*",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multiple,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null);
  const [uploadedId, setUploadedId] = useState<number | null>(currentImageId ?? null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    setPreview(URL.createObjectURL(file));

    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUploadedId(json.id);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setPreview(null);
      setUploadedId(null);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleRemove = () => {
    setPreview(null);
    setUploadedId(null);
    setUploadError(null);
    onRemove?.();
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1.5">{label}</label>
      )}

      {/* Passes the Strapi media ID (not the file) to the Server Action */}
      <input type="hidden" name={name} value={uploadedId ?? ""} />

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-auto rounded-md border object-cover"
          />
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
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
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
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}

      {uploadError && (
        <p className="text-destructive text-xs mt-1">{uploadError}</p>
      )}
    </div>
  );
}
