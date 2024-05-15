import FeedbackList from "./FeedbackList";
import Header from "./Header";
import { FeedbackItem as TFeedbackItem } from "../lib/types";

type ContainerProps = {
  onAddToList: (text: string) => void;
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  error: string | null;
};

export default function Container({
  onAddToList,
  feedbackItems,
  isLoading,
  error,
}: ContainerProps) {
  return (
    <main className="container">
      <Header onAddToList={onAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
