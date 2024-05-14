import { useEffect, useState } from "react";
import FeedbackItem, { TFeedbackItem } from "./FeedbackItem";
import Spinner from "./Spinner";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    ).then((response) => {
      response
        .json()
        .then((data) => {
          setFeedbackItems(data.feedbacks);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  return (
    <ol className="feedback-list">
      {loading ? (
        <Spinner />
      ) : (
        feedbackItems.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
        ))
      )}
    </ol>
  );
}
