import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
// import IssueStatusBadge from "../components/IssueStatusBadge";
// import Link from "../components/Link";
//import delay from "delay";
import IssuesActions from "../components/IssuesAction";
import { Status } from "@prisma/client";
import { object } from "zod";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const allStatus = Object.values(Status);
  const status = allStatus.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: status },
  });

  //await delay(2000);

  return (
    <>
      <IssuesActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}> {issue.title}</Link>

                <div className="block md:hidden">
                  {<IssueStatusBadge status={issue.status} />}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {<IssueStatusBadge status={issue.status} />}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
