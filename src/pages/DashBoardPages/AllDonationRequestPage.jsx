import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DonationRequestTableRow from "@/components/dashBoard/DonationRequestTable/DonationRequestTableRow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAllDonationRequest from "@/hooks/getDataFromDB/useAllDonationRequest";
import useRole from "@/hooks/getDataFromDB/useRole";
import PaginationComponent from "@/components/common/PaginationComponent";
import useTotalDonationRequest from "@/hooks/getDataFromDB/useTotalDonationRequest";
import Loader from "@/components/common/Loader";
import { Helmet } from "react-helmet-async";

const AllDonationRequestPage = () => {
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { userRole, isUserRolePending } = useRole();
  const postPerPage = 6;
  const { allDonationRequest, isAllDonationRequestPending, refetch } =
    useAllDonationRequest(filterValue, postPerPage, currentPage);
  const { totalDonationRequest, isTotalDonationRequestPending, refetchTotal } =
    useTotalDonationRequest(filterValue);

  if (
    isUserRolePending ||
    isAllDonationRequestPending ||
    isTotalDonationRequestPending
  )
    return <Loader />;

  return (
    <div className="mx-auto max-w-screen-2xl  px-4">
      <Helmet>
        <title>Red Wave - All Donation Requests</title>
      </Helmet>
      <div className="flex items-center justify-center ">
        <div className="w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
          <div className="mx-auto max-w-2xl text-center md:p-6">
            <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
              All donation Requests
            </h3>
          </div>
          <div className=" mb-14 mt-5 flex items-center justify-center ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Filter Table</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="space-x-1"
                forceMount
              >
                <DropdownMenuSeparator />
                <Button size="sm" onClick={() => setFilterValue("pending")}>
                  Pending
                </Button>
                <Button size="sm" onClick={() => setFilterValue("inprogress")}>
                  Inprogress
                </Button>
                <Button size="sm" onClick={() => setFilterValue("done")}>
                  Done
                </Button>
                <Button size="sm" onClick={() => setFilterValue("canceled")}>
                  Canceled
                </Button>
                <Button size="sm" onClick={() => setFilterValue("")}>
                  Clear
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recipient Name</TableHead>
                <TableHead>Recipient Location</TableHead>
                <TableHead>Donation Date</TableHead>
                <TableHead>Donation Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Donor Name</TableHead>
                <TableHead>Donor Email</TableHead>
                {userRole === "admin" && <TableHead>Edit</TableHead>}
                {userRole === "admin" && <TableHead>Delete</TableHead>}
                {userRole === "admin" && (
                  <TableHead className="text-right">View</TableHead>
                )}
                {userRole === "admin" && (
                  <TableHead className="text-right">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDonationRequest.map((donation) => (
                <DonationRequestTableRow
                  refetch={refetch}
                  key={donation._id}
                  donation={donation}
                  refetchTotal={refetchTotal}
                />
              ))}
            </TableBody>
          </Table>
          <div className="pt-10 md:pt-16">
            <PaginationComponent
              postPerPage={postPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPost={totalDonationRequest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDonationRequestPage;
