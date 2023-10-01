import Event from "@/models/Event";

export default function sumHours(events: Event[]) {
  let totalHours = 0.0;

  events.forEach((event: Event) => {
    if (event.approved) {
      totalHours += event.hours;
    }
  });

  return totalHours;
}
