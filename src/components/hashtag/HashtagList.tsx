import HashTagItem from "./HashTagItem";

type HashtagListProps = {
  companyNames: string[];
};

export default function HashtagList({ companyNames }: HashtagListProps) {
  return (
    <ul className="hashtags">
      {companyNames.map((companyName) => (
        <HashTagItem key={companyName} companyName={companyName} />
      ))}
    </ul>
  );
}
