import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { schemaIssue } from "../../validationSchemas";

export async function POST(req: NextRequest) {
  const body: Issue = await req.json();

  const validation = schemaIssue.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
