"use client";

import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "../../_lib/cn";

interface ImageUploadProps {
  name: string;
  label?: string;
  currentImageUrl?: string | null;
  onRemove?: () => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export function ImageUpload({
  name,
  label,
  currentImageUrl,
  onRemove,
  accept = "image/*",
  multiple = false,
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        // Set file to hidden input via DataTransfer
        const dt = new DataTransfer();
        dt.items.add(file);
        const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
        if (input) input.files = dt.files;
      }
    },
    [name]
  );

  const handleRemove = () => {
    setPreview(null);
    const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
    if (input) input.value = "";
    onRemove?.();
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1.5">
          {label}
        </label>
      )}
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-auto rounded-md border object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
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
            {isDragOver ? (
              <ImageIcon className="h-8 w-8 text-primary" />
            ) : (
              <Upload className="h-8 w-8" />
            )}
            <span className="text-xs">Drop image here or click to browse</span>
          </div>
          <input
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
