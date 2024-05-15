import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks/useFeedbackItemsContext";

export default function FeedbackList() {
  const { isLoading, error, filteredFeedbackItems } = useFeedbackItemsContext();
  return (
    <>
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      <ol className="feedback-list">
        {filteredFeedbackItems.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
        ))}
      </ol>
    </>
  );
}
