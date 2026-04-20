import { useState } from 'react';
import { API_CONFIG } from '../assets/constant/api';
import type { ChatBubbleProps } from '../atom/ChatBubble';
import { checkChatLimit } from '../util/ChatUtil';

export default function useChat() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

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

      const pastMessages = [];
      for (let i = 0; i < messages.length; i += 2) {
        if (messages[i] && messages[i + 1]) {
          const messagePair = {
            userMessage: messages[i].text,
            aiMessage: messages[i + 1].text,
          };
          pastMessages.push(messagePair);
        }
      }

      const requestBody = {
        prompt: currentInput,
        pastMessages: pastMessages,
      };

      const response = await fetch(API_CONFIG.baseUrl + '/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const extractedText = await response.text();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { isSender: false, text: extractedText },
        ]);
      } else {
        throw new Error(extractedText);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading, messages, setMessages, errorMessage, setErrorMessage, handleSend
  }
}