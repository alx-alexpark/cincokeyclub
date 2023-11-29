import UserSubmittedEvent from "@/models/UserSubmittedEvent";

export default function sumHours(events: UserSubmittedEvent[]) {
  let totalHours = 0.0;

  events.forEach((event: UserSubmittedEvent) => {
    if (event.approved) {
      totalHours += event.hours;
    }
  });

  return totalHours;
}
