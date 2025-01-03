import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      <DialogContent className="bg-[#1F1F1F] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            إضافة جلسة جديدة
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionDate">تاريخ الجلسة</Label>
            <Input
              id="sessionDate"
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextSessionDate">تاريخ الجلسة القادمة</Label>
            <Input
              id="nextSessionDate"
              type="date"
              value={nextSessionDate}
              onChange={(e) => setNextSessionDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomNumber">رقم القاعة</Label>
            <Input
              id="roomNumber"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="أدخل رقم القاعة"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="procedureType">نوع الإجراء</Label>
            <Input
              id="procedureType"
              value={procedureType}
              onChange={(e) => setProcedureType(e.target.value)}
              placeholder="أدخل نوع الإجراء"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decision">القرار</Label>
            <Textarea
              id="decision"
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="أدخل القرار"
              className="h-24"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="submit"
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black"
            >
              إضافة
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}