type HashTagItemProps = {
  companyName: string;
  onSelectCompany: (companyName: string) => void;
};

export default function HashTagItem({
  companyName,
  onSelectCompany,
}: HashTagItemProps) {
  return (
    <li>
      <button onClick={() => onSelectCompany(companyName)}>
        #{companyName}
      </button>
    </li>
  );
}
