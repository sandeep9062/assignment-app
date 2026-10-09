import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import PostJobForm from "@/components/PostJobForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Post a job | Likhai" };

export default async function PostJob() {
  const user = await getUser();
  if (!user) redirect("/login?next=/post-job");
  return <div className="wrap" style={{ padding: "30px 16px" }}><PostJobForm defaultCollege={user.college} /></div>;
}
