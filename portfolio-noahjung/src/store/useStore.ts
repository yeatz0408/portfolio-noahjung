import { create } from 'zustand'
import { persist } from "zustand/middleware"

type UIState = {
    isNavPaneOpen: boolean
    toggleIsNavPaneOpen: () => void
}

export const useUIStore = create<UIState>()(
    persist<UIState>(
        (set) => ({
            isNavPaneOpen: false,
            toggleIsNavPaneOpen: () =>
                set((state) => ({ isNavPaneOpen: !state.isNavPaneOpen })),
        }),
        {
            name: "ui-store",
        }
    )
)

type TimeLimit = {
    countFrom: Date;
    count: number;
}

type AIChatLimits = {
    minute: TimeLimit | undefined;
    hour: TimeLimit | undefined;
    day: TimeLimit | undefined;
}

type LimitStore = {
  aiChatLimits: AIChatLimits;
  setAiChatLimits: (limits: AIChatLimits) => void;
  setLimit: (type: keyof AIChatLimits, value: TimeLimit) => void;
};

export const useLimitStore = create<LimitStore>()(
  persist(
    (set) => ({
      aiChatLimits: {
        minute: undefined,
        hour: undefined,
        day: undefined,
      },

      setAiChatLimits: (limits) =>
        set(() => ({
          aiChatLimits: limits,
        })),

      setLimit: (type, value) =>
        set((state) => ({
          aiChatLimits: {
            ...state.aiChatLimits,
            [type]: value,
          },
        })),
    }),
    { name: "limit-store" }
  )
);

type LocationState = {
    city: string;
    ward: string;
    setCity: (city: string) => void;
    setWard: (ward: string) => void;
}

export const useLocationStore = create<LocationState>()((set) => ({
    city: "",
    ward: "",

    setCity: (city) => 
        set(() => ({ 
            city 
        })),

    setWard: (ward) => 
        set(() => ({ 
            ward 
        })),
}));