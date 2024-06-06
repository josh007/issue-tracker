import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";

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

  return <IssueSummary open={open} inProgress={inProgresss} closed={closed} />;
}
