import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";

const schemaIssue = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body: Issue = await req.json();

  const validation = schemaIssue.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
