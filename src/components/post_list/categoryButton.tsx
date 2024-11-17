import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  isCurrent: boolean;
  displayName: string;
  href: string;
  count: number;
  type?: string;
}

export const CategoryButton = ({
  isCurrent,
  displayName,
  href,
  count,
  type,
}: Props) => {
  return (
    <li>
      <Button
        asChild
        size={type ? "fl" : "sm"}
        variant={isCurrent ? "default" : "ghost"}
      >
        <Link href={href}>
          {displayName} ({count})
        </Link>
      </Button>
    </li>
  );
};
