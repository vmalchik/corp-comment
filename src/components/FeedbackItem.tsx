import { TriangleUpIcon } from "@radix-ui/react-icons";

export default function FeedbackItem() {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>593</span>
      </button>

      <div>
        <p>B</p>
      </div>

      <div>
        <p>CompanyName</p>
        {/* Generate following in VSCode using lorem15 */}
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
          quae porro molestiae harum earum saepe?
        </p>
      </div>

      <p>4d</p>
    </li>
  );
}
