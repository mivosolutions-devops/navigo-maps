"use client";

import AddMember from "@/components/myteam/add-member";
import TeamMember from "@/components/myteam/team-member";
import DataTable from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { teamMembers, teamMembersTableData } from "@/lib/placeholder-data";
import { ColumnDef } from "@tanstack/react-table";
import { CiSearch } from "react-icons/ci";
import { FiEdit3, FiMoreHorizontal } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";
import { BiUpArrowAlt } from "react-icons/bi";
import { capitalizeLetter1 } from "@/lib/utils";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { ImUserPlus } from "react-icons/im";
import CustomFormField from "@/components/ui/globals/form-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddMemberFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ActionModal from "@/components/ui/globals/action-modal";

const MyTeam = () => {
  const columns: ColumnDef<TeamMemberData>[] = [
    {
      accessorKey: "id",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Name</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="w-[2.5rem] h-[2.5rem] rounded-full overflow-clip relative">
              <Image src={row.original.imgUrl} alt="team member image" fill />
            </div>
            <span>{row.getValue("name")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Phone number</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div className="">{row.getValue("phoneNumber")}</div>;
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Email</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div className="">{row.getValue("email")}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Date added</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div className="">{row.getValue("createdAt")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Status</span>
          <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusValue =
          status == "active online"
            ? "Active"
            : status == "active offline"
              ? "Offline"
              : (status as string);
        const statusClassName =
          status == "active online"
            ? "text-emerald-500 bg-emerald-200"
            : status == "active offline"
              ? "text-yellow-500 bg-yellow-200"
              : status == "blocked"
                ? "text-red-500 bg-red-200"
                : "text-gray-500 bg-gray-200";
        return (
          <div
            className={`w-fit px-2 py-1 text-xs rounded-full ${statusClassName}`}
          >
            {capitalizeLetter1(statusValue)}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => <div className="text-gray-800">Actions</div>,
      cell: ({ row }) => {
        return (
          <FiMoreHorizontal className="text-lg text-gray-500 ml-4 cursor-pointer" />
        );
      },
    },
  ];

  const form = useForm<z.infer<typeof AddMemberFormSchema>>({
    resolver: zodResolver(AddMemberFormSchema),
    defaultValues: {
      email: "",
      idNumber: "",
    },
  });

  const onSubmit = (data: z.infer<typeof AddMemberFormSchema>) => {
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-cardBg p-4 py-8">
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <div className="w-full flex justify-between items-center py-2">
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="font-bold text-2xl text-gray-800">
              Impala Express Team
            </span>
            <span className="text-gray-400 text-sm">
              You can add ,edit ,remove and track your team
            </span>
          </div>
          <div className="w-[30%] relative flex">
            <CiSearch className="absolute self-center ml-4 text-gray-800" />
            <Input
              type="text"
              className="px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1 bg-gray-50"
              placeholder="search"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-start jutify-center gap-2">
          <span className="text-sm font-medium text-gray-700">Your team</span>
          <div className="w-full grid grid-cols-4 gap-6 bg-transparent">
            {teamMembers.map((teamMember) => {
              return <TeamMember {...teamMember} key={teamMember.id} />;
            })}
            <ActionModal
              actionContent={
                <div className="flex items-center space-x-2">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-full grid gap-8"
                    >
                      <CustomFormField
                        name="email"
                        inputStyles="text-xs"
                        control={form.control}
                        label="Email"
                        placeholder="example@gmail.com"
                      />
                      <CustomFormField
                        name="idNumber"
                        inputStyles="text-xs "
                        control={form.control}
                        label="ID Number"
                        placeholder="Nationanl Id"
                      />
                      <Button
                        type="submit"
                        size={"sm"}
                        className="bg-emerald-600 hover:bg-emerald-500 text-xs"
                      >
                        Add member{" "}
                      </Button>
                    </form>
                  </Form>
                </div>
              }
              description="Fill in his credentials"
              title="You are registering a new team member"
              trigger={
                <Card className="w-full bg-smallcards shadow-2xl shadow-shadow-500 transition-all duration-300 cursor-pointer border-none ring-1 ring-slate-300 hover:shadow-3xl hover:shadow-shadow-400 hover:ring-slate-400 grid place-items-center">
                  <CardContent className="w-full py-0 flex flex-col items-center justify-center gap-3 text-xl text-emerald-600 font-medium">
                    <ImUserPlus className="text-5xl" />
                    <span className="font-normal">New Member</span>
                  </CardContent>
                </Card>
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="w-full flex justify-between items-center ">
          <span className="text-sm font-medium text-gray-700">Team info</span>
          <div className="flex items-center justify-center gap-3 text-3xl">
            <FiEdit3 className="icon-normal" />
            <RiDeleteBin6Line className="icon-normal" />
            <FiMoreHorizontal className="icon-normal" />
          </div>
        </div>
        <DataTable columns={columns} data={teamMembersTableData} />
      </div>
    </div>
  );
};

export default MyTeam;
