import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">Join MentorMe to unlock your career potential</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Full Name</label>
            <input 
              id="name" 
              type="text" 
              className="w-full p-2 rounded-md border bg-background" 
              placeholder="John Doe" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              className="w-full p-2 rounded-md border bg-background" 
              placeholder="you@example.com" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="role">I am a...</label>
            <select id="role" className="w-full p-2 rounded-md border bg-background" required>
              <option value="individual">Student / Professional</option>
              <option value="institutional">Institution / College</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              className="w-full p-2 rounded-md border bg-background" 
              required
            />
          </div>
          <Button type="button" className="w-full bg-brand-orange text-white hover:bg-brand-orange/90 mt-2">
            Create Account
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/login" className="text-brand-blue font-semibold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
