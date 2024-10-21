import { SearchedValueType } from 'types/generic';

export type SubprojectApiItem = {
  id: string;
  code: string;
  coworker_id: string;
  coworker_name: string;
  project_id: string;
  project_name: string;
  registration_date: string;
}

export type SubprojectUiItem = {
  id: string;
  code: string;
  coworkerId: string;
  coworkerName: string;
  projectId: string;
  projectName: string;
  registrationDate: string;
}

export type SubprojectEditableProps = {
  code: string;
  project: SearchedValueType;
  coworker: SearchedValueType | null;
}