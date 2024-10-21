import { SearchedValueType } from 'types/generic';

export enum ProjectStatus {
  published = 'published',
  draft = 'draft'
}

export type ProjectApiItem = {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus,
  client_id: string;
  client_name: string;
  coworker_id: string;
  coworker_name: string;
  registration_date: string;
}

export type ProjectUiItem = {
  id: string;
  name: string;
  code: string;
  status: ProjectStatus,
  clientId: string;
  clientName: string;
  coworkerId: string;
  coworkerName: string;
  registrationDate: string;
}

export type ProjectEditableProps = {
  name: string;
  code: string;
  client: SearchedValueType;
  coworker: SearchedValueType | null;
}