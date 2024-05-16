import { create } from "zustand";
import { FeedbackItem } from "../../lib/types";
import { getCompanyNameFromText } from "../../lib/utils";

type Store = {
  feedbackItems: FeedbackItem[];
  isLoading: boolean;
  error: string | null;
  selectedCompany: string | null;
  // Derived State
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => FeedbackItem[];
  // Actions
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (companyName: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  error: null,
  selectedCompany: null,
  // derived state
  getCompanyList: () => {
    const state = get();
    const companyNames = state.feedbackItems.map((item) => item.company);
    return Array.from(new Set(companyNames));
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    const filtered = state.selectedCompany
      ? state.feedbackItems.filter(
          (item) => item.company === state.selectedCompany
        )
      : state.feedbackItems;
    return filtered;
  },
  // actions
  addItemToList: async (text: string) => {
    // Note: zustand will merge the state for us so no need to spread the state
    set(() => ({ error: null }));
    const newItem: FeedbackItem = {
      id: new Date().getTime(), // unique id based on timestamp OK for now
      upvoteCount: 0,
      badgeLetter: getCompanyNameFromText(text)[0]?.toUpperCase() || "",
      company: getCompanyNameFromText(text),
      text,
      daysAgo: 0,
    };

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    // optimistic update
    // setFeedbackItems([newItem, ...feedbackItems]);
    // persist to server
    try {
      await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          headers: {
            Accept: "application/json", // what we accept in response
            "Content-Type": "application/json", // what we send
          },
          body: JSON.stringify(newItem),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error();
        }
      });
    } catch {
      // rollback
      set((state) => ({
        error: "Error adding feedback",
        feedbackItems: [...state.feedbackItems.slice(1)],
      }));
    }
  },
  selectCompany: (companyName: string) => {
    set({ selectedCompany: companyName });
  },
  fetchFeedbackItems: async () => {
    set({ error: null, isLoading: true });
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set({ feedbackItems: data.feedbacks });
    } catch {
      set({ error: "Error fetching feedbacks" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
