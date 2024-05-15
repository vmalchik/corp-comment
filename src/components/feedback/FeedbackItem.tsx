import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackItem as TFeedbackItem } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;
  const [count, setCount] = useState(upvoteCount);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // prevent event bubbling from triggering handleOpen
    e.stopPropagation();
    setCount((prev) => prev + 1);
    // disable the button by targeting element that contains the onClick event listener
    e.currentTarget.disabled = true;
  };

  return (
    <li
      onClick={handleOpen}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{count}</span>
      </button>

      <div>
        <p>{badgeLetter}</p>
      </div>

      <div>
        <p>{company}</p>
        {/* Generate following in VSCode using lorem15 */}
        <p>{text}</p>
      </div>

      <p>{daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
    </li>
  );
}
