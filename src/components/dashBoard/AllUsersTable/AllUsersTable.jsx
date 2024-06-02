import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AllUsersTableRow from "./AllUsersTableRow";
import useAllUsers from "@/hooks/getDataFromDB/useAllUsers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AllUsersTable = () => {
  const [filterValue, setFilterValue] = useState("");

  const { allUsers, refetch } = useAllUsers(filterValue);
  return (
    <div className="mx-auto max-w-screen-2xl  px-4">
      <div className="flex items-center justify-center ">
        <div className="w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
          <div className="mx-auto max-w-2xl text-center md:p-6">
            <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
              A list of All users of our community!
            </h3>
            <div className=" mb-12 mt-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Filter Table</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="space-x-2"
                  forceMount
                >
                  <DropdownMenuSeparator />
                  <Button size="sm" onClick={() => setFilterValue("active")}>
                    Active
                  </Button>
                  <Button size="sm" onClick={() => setFilterValue("blocked")}>
                    Blocked
                  </Button>
                  <Button size="sm" onClick={() => setFilterValue("")}>
                    Clear
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avator</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user) => (
                <AllUsersTableRow
                  key={user._id}
                  user={user}
                  refetch={refetch}
                />
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersTable;
