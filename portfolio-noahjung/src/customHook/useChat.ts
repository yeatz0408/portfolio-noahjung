import { useState } from 'react';
import { API_CONFIG } from '../assets/constant/api';
import type { ChatBubbleProps } from '../atom/ChatBubble';
import { checkChatLimit, refundQuota } from '../util/ChatUtil';
import { useLocationStore } from '../store/useStore';

export default function useChat() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const city = useLocationStore((state) => state.city);
  const ward = useLocationStore((state) => state.ward);

  const handleSend = async (input: string, clearInput: () => void) => {
    if (!input) { 
      return;
    }

    try {
      checkChatLimit();

      setMessages((prev) => [...prev, { isSender: true, text: input }]);

      const currentInput = input;
      clearInput();

      setErrorMessage('');
      setIsLoading(true);

      const pastMessages: { userMessage: string; aiMessage: string }[] = [];
      let lastUserMsg = '';
      for (const msg of messages) {
        if (msg.isSender) {
          lastUserMsg = msg.text;
        } else if (lastUserMsg) {
          pastMessages.push({ userMessage: lastUserMsg, aiMessage: msg.text });
          lastUserMsg = ''; 
        }
      }

      const requestBody = { 
        prompt: currentInput, 
        pastMessages: pastMessages,
        currentLocationCity: city,
        currentLocationWard: ward,
      };

      const response = await fetch(API_CONFIG.baseUrl + '/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Platform-Id': import.meta.env.VITE_HANDSHAKE,
        },
        body: JSON.stringify(requestBody),
      });

      const extractedText = await response.text();

      if (response.ok) {
        setMessages((prev) => [
          ...prev, 
          { isSender: false, text: extractedText, isNew: true },
        ]);
      } else {
        throw new Error(extractedText); 
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
        if (err.name !== 'QuotaError') {
          refundQuota();
        }
      } else {
        setErrorMessage('An unexpected error occurred');
        refundQuota();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, messages, setMessages, errorMessage, setErrorMessage, handleSend };
}