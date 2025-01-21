import { LegalAssistant } from "@/components/legal-assistant/LegalAssistant";

export default function LegalAssistantPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
        المستشار القانوني
      </h1>
      <LegalAssistant />
    </div>
  );
}