import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

// Controlled input textarea
export default function FeedbackForm() {
  const [text, setText] = useState("");

  const count = text.length;
  const remaining = MAX_CHARACTERS - count;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = event.target.value;

    // // guard clause
    // if (newText.length > MAX_CHARACTERS) {
    //   return;
    // }

    setText(newText);
  };

  return (
    <form className="form">
      <textarea
        id="feedback-textarea"
        placeholder="" //  add empty placeholder to enable label visibility causing label to have 'present' attribute
        spellCheck="false"
        onChange={handleChange}
        maxLength={MAX_CHARACTERS}
      >
        {text}
      </textarea>
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
