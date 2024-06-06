import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";
import IssueChart from "./components/IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgresss = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  return <IssueChart open={open} inProgress={inProgresss} closed={closed} />;
}
