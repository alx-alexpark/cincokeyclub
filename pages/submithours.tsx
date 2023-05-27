import { useSession, signIn, signOut } from "next-auth/react"

export default function SubmitHours() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <form action="/api/upload">
          <input type="file" />
          <input type="submit" />
        </form>
        
      </>
    )
  }
  return (
    <>
      Access denied. Did you forget to sign in? <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}