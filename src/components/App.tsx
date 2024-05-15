import { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { FeedbackItem } from "../lib/types";

const getCompanyNameFromText = (text: string) => {
  return text
    .split(" ")
    .find((word) => word.includes("#"))!
    .substring(1);
};

function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleAddToDoList = (text: string) => {
    const newItem: FeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: getCompanyNameFromText(text)[0]?.toUpperCase() || "",
      companyName: getCompanyNameFromText(text),
      text,
      daysAgo: 0,
    };
    setFeedbackItems([newItem, ...feedbackItems]);
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
    <div className="app">
      <Footer />
      <Container
        onAddToList={handleAddToDoList}
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        error={error}
      />
      <HashtagList />
    </div>
  );
}

export default App;
