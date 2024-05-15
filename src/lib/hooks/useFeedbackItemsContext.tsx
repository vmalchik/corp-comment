import { createContext, useContext, useEffect, useState } from "react";
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

export const useFeedbackItems = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch {
        setError("Error fetching feedbacks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // alternative to async/await
  // useEffect(() => {
  //   setError(null);
  //   setLoading(true);
  //   fetch(
  //     "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
  //   ).then((response) => {
  //     response
  //       .json()
  //       .then((data) => {
  //         if (!response.ok) {
  //           throw new Error();
  //         }
  //         setFeedbackItems(data.feedbacks);
  //       })
  //       .catch(() => {
  //         // common causes: network error, not 2xx response, json parsing error
  //         setError("Error fetching feedbacks");
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   });
  // }, []);
  return {
    feedbackItems,
    isLoading,
    error,
    setFeedbackItems,
    setError,
  };
};
