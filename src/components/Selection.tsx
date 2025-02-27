import { ListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";

export type SelectionInfo = { id: number; label: string; value: string };

interface SelectionProps {
  collection: ListCollection<SelectionInfo>;
  placeholder: string;
  onSelect: (id: number) => void;
}

export default function Selection({
  collection,
  placeholder,
  onSelect,
}: SelectionProps) {
  return (
    <SelectRoot
      variant="subtle"
      collection={collection}
      onValueChange={({ items }) => onSelect(items[0].id)}
    >
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((item) => (
          <SelectItem item={item} key={item.id}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
