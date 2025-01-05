import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
}

export function AddSessionDialog({ open, onOpenChange, onSubmit }: AddSessionDialogProps) {
  const [sessionDate, setSessionDate] = useState("");
  const [nextSessionDate, setNextSessionDate] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [procedureType, setProcedureType] = useState("");
  const [decision, setDecision] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      session_date: sessionDate,
      next_session_date: nextSessionDate || null,
      room_number: roomNumber || null,
      procedure_type: procedureType || null,
      decision: decision || null,
    });

    // Reset form
    setSessionDate("");
    setNextSessionDate("");
    setRoomNumber("");
    setProcedureType("");
    setDecision("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-[#111] to-[#1A1A1A] border-white/10 max-w-lg" dir="rtl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent rounded-lg pointer-events-none" />
        
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
            إضافة جلسة جديدة
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            أدخل تفاصيل الجلسة الجديدة أدناه
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionDate">تاريخ الجلسة</Label>
              <Input
                id="sessionDate"
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-[#4CD6B4] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextSessionDate">تاريخ الجلسة القادمة</Label>
              <Input
                id="nextSessionDate"
                type="date"
                value={nextSessionDate}
                onChange={(e) => setNextSessionDate(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-[#4CD6B4] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomNumber">رقم القاعة</Label>
              <Input
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="أدخل رقم القاعة"
                className="bg-white/5 border-white/10 focus:border-[#4CD6B4] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="procedureType">نوع الإجراء</Label>
              <Input
                id="procedureType"
                value={procedureType}
                onChange={(e) => setProcedureType(e.target.value)}
                placeholder="أدخل نوع الإجراء"
                className="bg-white/5 border-white/10 focus:border-[#4CD6B4] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="decision">القرار</Label>
              <Textarea
                id="decision"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="أدخل القرار"
                className="h-24 bg-white/5 border-white/10 focus:border-[#4CD6B4] transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-start gap-3">
            <Button
              type="submit"
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-6"
            >
              إضافة
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10 hover:bg-white/5"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}