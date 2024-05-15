type HashTagItemProps = { companyName: string };

export default function HashTagItem({ companyName }: HashTagItemProps) {
  return (
    <li>
      <button>#{companyName}</button>
    </li>
  );
}
