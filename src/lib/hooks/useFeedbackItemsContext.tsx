import { createContext, useContext } from "react";
import { FeedbackItem } from "../types";

type TFeedbackItemsContext = {
  filteredFeedbackItems: FeedbackItem[];
  isLoading: boolean;
  error: string | null;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectedCompany: (companyName: string) => void;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export const useFeedbackItemsContext = () => {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not found in FeedbackList component"
    );
  }
  return context;
};

export default FeedbackItemsContext;
