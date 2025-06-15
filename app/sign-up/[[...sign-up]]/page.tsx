import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-theme";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignUp appearance={clerkAppearance} />
    </div>
  );
}
