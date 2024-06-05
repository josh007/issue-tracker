"use client";
import { User } from ".prisma/client";
import { Skeleton } from "@/app/components";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => await axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //for 60sec it won't be re-fetched
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;
  console.log(issue);
  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "-"}
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId !== "-" ? userId : null,
        });
      }}
    >
      <Select.Trigger placeholder="Assign...." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item key="" value="-">
            Unassigned
          </Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
