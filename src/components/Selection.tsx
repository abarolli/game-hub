import { ListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";

interface SelectionProps {
  collection: ListCollection<{ label: string; value: string }>;
  placeholder: string;
}

export default function Selection({ collection, placeholder }: SelectionProps) {
  return (
    <SelectRoot variant="subtle" collection={collection}>
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
