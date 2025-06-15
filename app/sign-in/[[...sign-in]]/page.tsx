import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-theme"; // ✅ make sure this path matches your file

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignIn appearance={clerkAppearance} />
    </div>
  );
}
