import FeedbackItem from "./FeedbackItem";

const feedbackItem1 = {
  upvoteCount: 3,
  badgeLetter: "P",
  companyName: "Pied Piper",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis nec.",
  daysAgo: 2,
};

const feedbackItem2 = {
  upvoteCount: 3,
  badgeLetter: "P",
  companyName: "Pied Piper",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis nec.",
  daysAgo: 2,
};

const feedbackItems = [feedbackItem1, feedbackItem2];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem, index) => (
        <FeedbackItem key={index} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
