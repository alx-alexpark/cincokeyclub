import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

interface HoursRequest {
    hours: string;
    picture: string;
    eventId: string;
    approved: null;
    user: string;
    userImage: string;
    userEmail: string;
}

export default function AdminPanel() {
    const { data: session, status } = useSession()
    const [isAdmin, setIsAdmin] = useState(false);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/isadmin").then(res => {
            setIsAdmin(res.data.admin);
        }).catch(error => {
            console.error(error);
            setIsAdmin(false);
        });

        axios.get("/api/pending").then(res => {
            setRequests(res.data.pending);
        })
    }, []);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (isAdmin && session) {
        return (
            <main>
                <h1>Sussy Admin Panel</h1>
                {requests.map((req: HoursRequest) => <div>
                    <p>Hours {req.hours}</p><br/>
                    <img src={req.picture} />
                    <p>Submitted by {req.user}</p>
                    <button onClick={async () => {
                        await axios.post("/api/approveOrDeny", {status: true, id: req.eventId, email: req.userEmail})
                    }}>Approve</button>
                    <button onClick={async () => {
                        await axios.post("/api/approveOrDeny", {status: "deny", id: req.eventId, email: req.userEmail})
                    }}>Deny</button>
                </div>)}
            </main>
        )
    }

    return (
        <><h1>Access Denied</h1></>
    )
}
