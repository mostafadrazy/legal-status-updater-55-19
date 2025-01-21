import { CaseCard } from "@/components/CaseCard";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const DashboardContent = () => {
  const { session } = useAuth();

  const { data: cases, error, isLoading } = useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      console.log('Fetching cases for user:', session?.user?.id);
      if (!session?.user?.id) {
        console.log('No user ID found, returning empty array');
        return [];
      }

      try {
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching cases:', error);
          throw error;
        }
        
        console.log('Fetched cases:', data);
        return data || [];
      } catch (error: any) {
        console.error('Error in query:', error);
        toast.error('حدث خطأ أثناء تحميل القضايا');
        throw error;
      }
    },
    enabled: !!session?.user?.id,
    retry: 3,
    retryDelay: 1000
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-2">حدث خطأ أثناء تحميل القضايا</p>
        <p className="text-sm text-gray-400">يرجى المحاولة مرة أخرى لاحقاً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cases?.map((caseItem, index) => (
        <div
          key={caseItem.id}
          className="transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <CaseCard 
            id={caseItem.id}
            caseNumber={caseItem.case_number}
            title={caseItem.title}
            status={caseItem.status}
            nextHearing={caseItem.next_hearing}
            client={caseItem.client}
            caseCode={caseItem.case_code}
          />
        </div>
      ))}
    </div>
  );
};