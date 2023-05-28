import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function AdminPanel() {
    const { data: session, status } = useSession()
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/api/isadmin").then(res => {
            setIsAdmin(res.data.admin);
        }).catch(error => {
            console.error(error);
            setIsAdmin(false);
        });
    }, []);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (isAdmin && session) {
        return (
            <main>
                <h1>Sussy Admin Panel</h1>
            </main>
        )
    }

    return (
        <><h1>Access Denied</h1></>
    )
}
