import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FileText, Upload, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface DocumentsTabProps {
  documents: any[];
  onUpload: (file: File) => Promise<void>;
  onViewDocument: (doc: any) => Promise<void>;
}

export function DocumentsTab({ documents, onUpload, onViewDocument }: DocumentsTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { session } = useAuth();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onUpload(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-[#4CD6B4]" />
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
            </p>
            <p className="text-xs text-gray-400">
              PDF, DOCX, JPG, PNG (الحد الأقصى: 5MB)
            </p>
          </div>
          <Input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
            accept=".pdf,.docx,.jpg,.jpeg,.png"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            className="flex flex-col p-4 rounded-lg bg-white/5 border border-white/10 animate-fade-in"
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#4CD6B4]" />
              <div className="flex-1">
                <p className="text-white font-medium">{doc.file_name}</p>
                <p className="text-sm text-gray-400">
                  {new Date(doc.uploaded_at).toLocaleString('ar-SA')}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDocument(doc)}
                className="text-[#4CD6B4] border-[#4CD6B4]"
              >
                <Eye className="w-4 h-4 mr-2" />
                عرض
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}