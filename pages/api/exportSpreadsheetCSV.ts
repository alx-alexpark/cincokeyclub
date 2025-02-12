import clientPromise from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function exportSpreadsheet(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("auth");

    const eventsCollection = db.collection("events");
    const events = await eventsCollection.find().toArray();
    const users = await db.collection("users").find().toArray();
    const eventIds = events.map(event => event.id);
    const eventNames = events.map(event => event.name);

    let userHoursRows = "";
    console.log(eventIds)

    users.forEach(user => {
        if (!user.events)  {
            console.log("User has no events")
            // console.log(user)
            return
        }
        
        let hoursRow = Array(eventIds.length).fill(0); 
        user.events.forEach((event: {
            approved: boolean;
            eventId: any; id: any; hours: number; 
}) => {
            console.log("adding hours");
            console.log(eventIds.indexOf(event.eventId) + ":" + event.hours + ":" + event.eventId);
            if (event.approved == true) 
                hoursRow[eventIds.indexOf(event.eventId)] += event.hours; 
        });
        let csvRow = user.name + ", " + hoursRow.join(",");
        userHoursRows += csvRow + "\n";
    });

    const csvHeader = " , " +eventIds.join(",") + "\n" + ", " + eventNames.join(",") + "\n";
    const csvContent = `${csvHeader}${userHoursRows}`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="sussyamogus.csv"');
    res.send(csvContent);

}