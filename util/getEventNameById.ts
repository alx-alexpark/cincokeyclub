import clientPromise from "../lib/mongodb";

export default async function getEventNameById(id: String) {
    const client = await clientPromise;
    const db = client.db("auth");
      const collection = db.collection("events");
      const allEvents = await collection.find().toArray();
      for (let i = 0; i < allEvents.length; i++) {
          if (allEvents[i].id == id) {
              return allEvents[i].name;
          }
      }
      return "Event name not found";
  }