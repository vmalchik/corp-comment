import { useEffect, useMemo, useState } from "react";
import { FeedbackItem } from "../../lib/types";
import { getCompanyNameFromText } from "../../lib/utils";
import { FeedbackItemsContext } from "../../lib/hooks/useFeedbackItemsContext";

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

// Dedicated component to manage state and side effects
export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // derived state wrapped in useMemo for performance
  const companyNames = useMemo(
    () => feedbackItems.map((item) => item.company),
    [feedbackItems]
  );
  const uniqueCompanyNames = useMemo(
    () => Array.from(new Set(companyNames)),
    [companyNames]
  );

  const filteredFeedbackItems = useMemo(() => {
    const filtered = selectedCompany
      ? feedbackItems.filter((item) => item.company === selectedCompany)
      : feedbackItems;
    return filtered;
  }, [selectedCompany, feedbackItems]);

  const handleSelectedCompany = (companyName: string) => {
    setSelectedCompany(companyName);
  };

  const handleAddToList = async (text: string) => {
    setError(null);
    const newItem: FeedbackItem = {
      id: new Date().getTime(), // unique id based on timestamp OK for now
      upvoteCount: 0,
      badgeLetter: getCompanyNameFromText(text)[0]?.toUpperCase() || "",
      company: getCompanyNameFromText(text),
      text,
      daysAgo: 0,
    };
    // optimistic update
    setFeedbackItems([newItem, ...feedbackItems]);
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
      setError("Error adding feedback");
      // rollback
      setFeedbackItems([...feedbackItems.slice(1)]);
    }
  };

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

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        error,
        companyList: uniqueCompanyNames,
        handleAddToList,
        handleSelectedCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
