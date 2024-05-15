import FeedbackItem from "./FeedbackItem";
import { FeedbackItem as TFeedbackItem } from "../../lib/types";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

type FeedbackListProps = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  error: string | null;
};

export default function FeedbackList({
  feedbackItems,
  isLoading,
  error,
}: FeedbackListProps) {
  return (
    <>
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      <ol className="feedback-list">
        {feedbackItems.map((feedbackItem) => (
          <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
        ))}
      </ol>
    </>
  );
}
