import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";
import HashTagItem from "./HashTagItem";

export default function HashtagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  return (
    <ul className="hashtags">
      {companyList.map((companyName) => (
        <HashTagItem
          key={companyName}
          companyName={companyName}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}
