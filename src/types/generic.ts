
export type SearchedValueType = {
  name: string;
  value: string;
}

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export enum TableModalActions {
  delete = 'delete',
  publish = 'publish',
  unpublish = 'unpublish',
}