import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";
import IssueChart from "./components/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./components/LatestIssues";

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

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgresss} closed={closed} />
        <IssueChart open={open} inProgress={inProgresss} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
