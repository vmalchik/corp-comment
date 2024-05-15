import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackItem as TFeedbackItem } from "../lib/types";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const { upvoteCount, badgeLetter, companyName, text, daysAgo } = feedbackItem;
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{badgeLetter}</p>
      </div>

      <div>
        <p>{companyName}</p>
        {/* Generate following in VSCode using lorem15 */}
        <p>{text}</p>
      </div>

      <p>{daysAgo}</p>
    </li>
  );
}
