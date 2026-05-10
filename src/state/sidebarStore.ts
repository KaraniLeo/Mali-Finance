import { create } from 'zustand';

interface SidebarState {
  isExpanded: boolean;
  isOpenMobile: boolean;
  toggleSidebar: () => void;
  setMobileOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: true, // Default to expanded on desktop
  isOpenMobile: false, // Default to closed on mobile
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setMobileOpen: (open) => set({ isOpenMobile: open }),
}));
