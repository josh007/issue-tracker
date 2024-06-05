import prisma from "@/prisma/client";
// import IssueStatusBadge from "../components/IssueStatusBadge";
// import Link from "../components/Link";
//import delay from "delay";
import { Status } from "@prisma/client";
import IssuesActions from "../components/IssuesAction";
import IssueTable, { columnNames, IssueQuery } from "../components/IssueTable";
import Pagination from "../components/Pagination";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const allStatus = Object.values(Status);
  const status = allStatus.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });
  //await delay(2000);

  return (
    <Flex direction="column" gap="3">
      <IssuesActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
