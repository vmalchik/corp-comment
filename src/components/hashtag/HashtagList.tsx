import { useFeedbackItemsContext } from "../../lib/hooks/useFeedbackItemsContext";
import HashTagItem from "./HashTagItem";

export default function HashtagList() {
  const { companyList, handleSelectedCompany } = useFeedbackItemsContext();

  return (
    <ul className="hashtags">
      {companyList.map((companyName) => (
        <HashTagItem
          key={companyName}
          companyName={companyName}
          onSelectCompany={handleSelectedCompany}
        />
      ))}
    </ul>
  );
}
