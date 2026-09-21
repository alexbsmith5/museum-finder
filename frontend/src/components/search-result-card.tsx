import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { SearchResultItem } from "@/lib/types/search";

export default function SearchResultCard({
  title,
  label,
  description,
}: SearchResultItem) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{label}</CardDescription>
        {description && (
          <p className="text-sm text-muted-foreground pt-1">{description}</p>
        )}
      </CardHeader>
    </Card>
  );
}
