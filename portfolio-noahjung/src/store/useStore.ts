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