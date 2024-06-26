import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

// Controlled input textarea
export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const count = text.length;
  const remaining = MAX_CHARACTERS - count;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = event.target.value;

    // guard clause
    // if (newText.length > MAX_CHARACTERS) {
    //   return;
    // }

    setText(newText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page refresh

    // basic validation
    if (text.includes("#") && text.length >= 1) {
      setShowValidIndicator(true);
      setTimeout(() => {
        setShowValidIndicator(false);
      }, 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => {
        setShowInvalidIndicator(false);
      }, 2000);
      return;
    }

    onAddToList(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      } `}
    >
      <textarea
        maxLength={MAX_CHARACTERS}
        id="feedback-textarea"
        placeholder="" //  add empty placeholder to enable label visibility causing label to have 'present' attribute
        spellCheck="false"
        onChange={handleChange}
        value={text}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{remaining}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
