import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function getOrCreateConversation(userId: string): Promise<string> {
  try {
    // Get the most recent conversation
    const { data: conversations, error: fetchError } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError) throw fetchError;

    if (conversations && conversations.length > 0) {
      return conversations[0].id;
    }

    // Create new conversation
    const { data: newConversation, error: insertError } = await supabase
      .from('conversations')
      .insert([{ 
        id: uuidv4(), 
        user_id: userId 
      }])
      .select('id')
      .single();

    if (insertError) throw insertError;
    if (!newConversation) throw new Error('Failed to create conversation');

    return newConversation.id;
  } catch (error) {
    console.error('Error in getOrCreateConversation:', error);
    throw error;
  }
}

export async function getConversationMessages(conversationId: string) {
  try {
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return messages || [];
  } catch (error) {
    console.error('Error in getConversationMessages:', error);
    throw error;
  }
}

export async function addMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  searchQuery?: string,
  searchResults?: any
) {
  try {
    const { data: message, error } = await supabase
      .from('messages')
      .insert([{
        id: uuidv4(),
        conversation_id: conversationId,
        role,
        content,
        search_query: searchQuery,
        search_results: searchResults
      }])
      .select()
      .single();

    if (error) throw error;
    return message;
  } catch (error) {
    console.error('Error in addMessage:', error);
    throw error;
  }
}

export async function deleteConversation(conversationId: string) {
  try {
    // Delete all messages first due to foreign key constraint
    const { error: messagesError } = await supabase
      .from('messages')
      .delete()
      .eq('conversation_id', conversationId);

    if (messagesError) throw messagesError;

    // Then delete the conversation
    const { error: conversationError } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (conversationError) throw conversationError;
  } catch (error) {
    console.error('Error in deleteConversation:', error);
    throw error;
  }
}