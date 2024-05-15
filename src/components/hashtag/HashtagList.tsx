import HashTagItem from "./HashTagItem";

type HashtagListProps = {
  companyNames: string[];
  onSelectedCompany: (companyName: string) => void;
};

export default function HashtagList({
  companyNames,
  onSelectedCompany,
}: HashtagListProps) {
  return (
    <ul className="hashtags">
      {companyNames.map((companyName) => (
        <HashTagItem
          key={companyName}
          companyName={companyName}
          onSelectCompany={onSelectedCompany}
        />
      ))}
    </ul>
  );
}
