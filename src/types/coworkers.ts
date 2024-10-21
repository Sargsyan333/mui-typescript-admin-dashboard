export enum InvitationStatus {
  NOT_SENT = 'not_sent',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
}

export type CoworkerApiItem = {
  id: string;
  company_name: string;
  registration_date: string;
  email: string;
  invitation_status: InvitationStatus;
}

export type CoworkerUiItem = {
  id: string;
  companyName: string;
  registrationDate: string;
  emailAddress: string;
  invitationStatus: InvitationStatus;
}

export type CoworkerEditableProps = {
  companyName: string;
  emailAddress: string;
}