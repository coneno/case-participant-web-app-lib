export interface FooterConfig {
  columns: Array<FooterColumnConfig>;
}

export interface FooterColumnConfig {
  columnKey: string;
  items: Array<FooterLinkItemConfig>;
}

export interface FooterLinkItemConfig {
  type: 'internal' | 'external' | 'language';
  itemKey: string;
  value: string;
  iconClass?: string;
}
