import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUploaded: (url: string) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
}

export default function FileUpload({ 
  onFileUploaded, 
  accept = "image/*,.zip,.pdf,.mp4,.webm",
  maxSize = 100 * 1024 * 1024, // 100MB
  label = "Upload File"
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      setUploadedFile(result.originalName);
      onFileUploaded(result.url);
      
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed", 
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [onFileUploaded, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.split(",").reduce((acc, curr) => {
      acc[curr.trim()] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
    onFileUploaded("");
  };

  if (uploadedFile) {
    return (
      <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <File className="h-5 w-5 text-green-600" />
          <span className="text-sm text-green-800">{uploadedFile}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={removeFile}
          data-testid="remove-file"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? "border-brand-purple bg-purple-50" 
          : "border-slate-300 hover:border-brand-purple hover:bg-slate-50"
        }
        ${uploading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      data-testid="file-upload-zone"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
      <p className="text-lg font-medium text-slate-600 mb-2">
        {uploading ? "Uploading..." : label}
      </p>
      <p className="text-sm text-slate-500">
        {isDragActive 
          ? "Drop the file here..."
          : "Drag & drop a file here, or click to select"
        }
      </p>
      <p className="text-xs text-slate-400 mt-2">
        Supports images, videos, PDFs, and SCORM packages (max {Math.round(maxSize / 1024 / 1024)}MB)
      </p>
    </div>
  );
}
