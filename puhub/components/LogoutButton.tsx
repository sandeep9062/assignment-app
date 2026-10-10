"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toaster";

export default function LogoutButton() {
  const router = useRouter();
  const toast = useToast();
  return (
    <button
      className="linklike"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        toast.info("You have been logged out.");
        router.push("/");
        router.refresh();
      }}
    >
      Log out
    </button>
  );
}
