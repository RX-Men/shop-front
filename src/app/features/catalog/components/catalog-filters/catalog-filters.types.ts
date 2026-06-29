interface GroupFiltersItem {
  label: string;
  value: string;
}

interface GroupFilters {
  label: string;
  value: string;
  items: GroupFiltersItem[];
}

export type { GroupFilters };
