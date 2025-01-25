import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { cn } from "@/lib/utils";
import * as z from "zod";

const formSchema = z.object({
  initialNote: z.string().optional(),
});

type NotesFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const NotesFields = ({ form }: NotesFieldsProps) => {
  const [isListening, setIsListening] = useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    commands: [
      {
        command: '*',
        callback: (command) => {
          console.log('Voice command received:', command);
          const currentValue = form.getValues("initialNote") || "";
          form.setValue("initialNote", currentValue + " " + command);
        }
      }
    ]
  });

  useEffect(() => {
    if (listening) {
      console.log('Speech recognition is active');
    } else {
      console.log('Speech recognition is inactive');
    }
  }, [listening]);

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition");
      return;
    }

    if (listening) {
      console.log('Stopping speech recognition');
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      console.log('Starting speech recognition');
      resetTranscript();
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: true, language: 'ar-MA' });
    }
  };

  return (
    <div className="relative">
      <FormField
        control={form.control}
        name="initialNote"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">ملاحظات أولية</FormLabel>
            <div className="relative">
              <FormControl>
                <Textarea 
                  placeholder="أضف ملاحظات أولية للقضية..."
                  className="h-32 resize-none pr-12"
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                onClick={handleMicClick}
                className={cn(
                  "absolute left-2 bottom-2 rounded-xl p-2 transition-all duration-300 h-9 w-9",
                  isListening
                    ? "bg-red-500 text-white hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/20"
                    : "bg-gradient-to-r from-[#4CD6B4] to-[#34D399] text-white hover:shadow-lg hover:shadow-[#4CD6B4]/20 hover:scale-105"
                )}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};