import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { FeedbackItem as TFeedbackItem } from "../lib/types";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <ol className="feedback-list">
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
