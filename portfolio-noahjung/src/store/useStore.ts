import { create } from 'zustand'

type UIState = {
    pageId: string;
    isNavPaneOpen: boolean;
    setPageId: (id: string) => void;
    toggleIsNavPaneOpen: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    pageId: '/',
    isNavPaneOpen: false,

    setPageId: (id) => set({ pageId: id }),
    toggleIsNavPaneOpen: () =>
        set((state) => ({ isNavPaneOpen: !state.isNavPaneOpen })),
}))