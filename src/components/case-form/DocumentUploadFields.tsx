import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FileUp, X } from "lucide-react";
import * as z from "zod";

const formSchema = z.object({
  documents: z.array(
    z.object({
      file: z.instanceof(File),
      type: z.string(),
      description: z.string().optional(),
    })
  ).optional(),
});

type DocumentUploadFieldsProps = {
  form: UseFormReturn<any>;
};

export const DocumentUploadFields = ({ form }: DocumentUploadFieldsProps) => {
  const documents = form.watch("documents") || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const currentDocs = form.getValues("documents") || [];
    
    const newDocs = files.map(file => ({
      file,
      type: "other",
      description: "",
    }));

    form.setValue("documents", [...currentDocs, ...newDocs]);
  };

  const removeDocument = (index: number) => {
    const currentDocs = form.getValues("documents") || [];
    const newDocs = currentDocs.filter((_, i) => i !== index);
    form.setValue("documents", newDocs);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileUp className="w-8 h-8 mb-2 text-[#4CD6B4]" />
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
            </p>
            <p className="text-xs text-gray-400">
              PDF, DOCX, JPG, PNG (حجم الملف الأقصى: 5MB)
            </p>
          </div>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.docx,.jpg,.jpeg,.png"
          />
        </label>
      </div>

      <div className="space-y-4">
        {documents.map((doc: any, index: number) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{doc.file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(index)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Select
                value={doc.type}
                onValueChange={(value) => {
                  const currentDocs = form.getValues("documents");
                  currentDocs[index].type = value;
                  form.setValue("documents", currentDocs);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="نوع المستند" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract">عقد</SelectItem>
                  <SelectItem value="court_document">مستند محكمة</SelectItem>
                  <SelectItem value="power_of_attorney">توكيل</SelectItem>
                  <SelectItem value="evidence">دليل</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="وصف المستند (اختياري)"
                value={doc.description}
                onChange={(e) => {
                  const currentDocs = form.getValues("documents");
                  currentDocs[index].description = e.target.value;
                  form.setValue("documents", currentDocs);
                }}
                className="h-20"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};