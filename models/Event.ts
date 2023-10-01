export default interface Event {
  image: string;
  hours: number;
  approved: null | boolean;

  user: string;
  userImage: string;
  // userEmail: string;
  // picture: String;

  // event: string;
  eventName: string;
  eventId: string;
  // createdBy: string;
  // dateCreated: number;

  code?: number;
  hidden?: boolean;
}
