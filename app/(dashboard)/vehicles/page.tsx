"use client";

import DataTable from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { navigatingRoutes, vehiclesData, vehiclesTableData } from "@/lib/placeholder-data";
import { ColumnDef } from "@tanstack/react-table";
import { CiSearch } from "react-icons/ci";
import { FiEdit3, FiMoreHorizontal } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";
import { BiUpArrowAlt } from "react-icons/bi";
import { capitalizeLetter1, getAuthorizationHeader } from "@/lib/utils";
import Image from "next/image";
import Vehicle from "@/components/vehicles/vehicle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ActionModal from "@/components/ui/globals/action-modal";
import CustomFormField from "@/components/ui/globals/form-field";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormFieldSelect from "@/components/ui/globals/form-select-field";
import { z } from "zod";
import { AddVehicleFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaBusAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const MyVehicles = () => {
  const columns: ColumnDef<TRoute>[] = [
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
      accessorKey: "location",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Location</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("location")}</div>;
      },
    },
    {
      accessorKey: "address",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Address</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("address")}</div>;
      },
    },
    {
      accessorKey: "latitude",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Latitude</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("latitude")}</div>;
      },
    },
    {
      accessorKey: "longitude",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Longitude</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div>{row.getValue("longitude")}</div>;
      },
    },
    {
      accessorKey: "id",
      header: () => <div className="text-gray-800">Actions</div>,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size={"icon"}
                className={`bg-logo-gradient rounded-full p-3`}
              >
                <FiMoreHorizontal className="text-lg text-white cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={-2}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/maps/${row.original.id}`}>View maps</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];  

  const form = useForm<z.infer<typeof AddVehicleFormSchema>>({
    resolver: zodResolver(AddVehicleFormSchema),
  });

  const onSubmit = (data: z.infer<typeof AddVehicleFormSchema>) => {
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col gap-8 bg-cardBg p-4 py-8">
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <div className="w-full flex justify-between items-center py-2">
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="font-bold text-2xl text-gray-800">
              Impala Express Vehicles
            </span>
            <span className="text-gray-400 text-sm">
              You can add ,edit ,remove and track your vehicles
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
          <span className="text-sm font-medium text-gray-700">
            Your vehicles
          </span>
          <div className="w-full grid grid-cols-4 auto-rows-fr gap-6 bg-transparent">
            {vehiclesData.map((vehicleData) => {
              return <Vehicle {...vehicleData} key={vehicleData.id} />;
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
                        name="plateNumber"
                        inputStyles="text-xs"
                        control={form.control}
                        label="Plate Number"
                        placeholder="RRA 001 A"
                      />
                      <FormFieldSelect
                        name="type"
                        control={form.control}
                        inputStyles="text-xs"
                        label="Type"
                        placeholder="select vehicle type"
                        options={["small", "big"]}
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
              description="Fill in it's credentials"
              title="You are registering a new vehicle"
              trigger={
                <Card className="w-full bg-smallcards shadow-2xl shadow-shadow-500 transition-all duration-300 cursor-pointer border-none ring-1 ring-slate-300 hover:shadow-3xl hover:shadow-shadow-400 hover:ring-slate-400 grid place-items-center">
                  <CardContent className="w-full py-0 flex flex-col items-center justify-center gap-3 text-xl text-emerald-600 font-medium">
                    <FaBusAlt className="text-5xl" />
                    <span className="font-normal">New Vehicle</span>
                  </CardContent>
                </Card>
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="w-full flex justify-between items-center ">
          <span className="text-sm font-medium text-gray-700">
            Vehicles info
          </span>
          <div className="flex items-center justify-center gap-3 text-3xl">
            <FiEdit3 className="icon-normal" />
            <RiDeleteBin6Line className="icon-normal" />
            <FiMoreHorizontal className="icon-normal" />
          </div>
        </div>
        <DataTable columns={columns} data={navigatingRoutes} />
      </div>
    </div>
  );
};

export default MyVehicles;
