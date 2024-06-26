import Loader from "@/components/common/Loader";
import ContentManagementTableRow from "@/components/dashBoard/ContentManagementTableRow";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAllBlogs from "@/hooks/getDataFromDB/useAllBlogs";
import useRole from "@/hooks/getDataFromDB/useRole";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ContentManagement = () => {
  const [filterValue, setFilterValue] = useState("");
  const { userRole, isUserRolePending } = useRole();
  const { allBlogs, isAllBlogsPending, refetch } = useAllBlogs(filterValue);

  if (isUserRolePending || isAllBlogsPending) return <Loader />;

  return (
    <section>
      <Helmet>
        <title>Red Wave - All Blogs</title>
      </Helmet>
      <div className="mx-auto max-w-screen-2xl  px-4">
        <div className="flex items-center justify-center ">
          <div className="w-full rounded-md border-2 p-5  md:p-8 lg:w-4/5 xl:w-4/5 ">
            <div className="flex justify-end pb-10">
              <Link to="/dashboard/content-management/add-blog">
                <Button size="lg">Add Blog Post</Button>
              </Link>
            </div>
            <div className="mx-auto max-w-2xl  text-center md:p-6">
              <h3 className=" pb-4 text-center text-2xl font-semibold uppercase md:text-3xl">
                A list of All blogs of Blood Wave!
              </h3>
              <div className=" mb-12 mt-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>Filter Blogs</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    className="space-x-2"
                    forceMount
                  >
                    <DropdownMenuSeparator />

                    <Button
                      size="sm"
                      onClick={() => setFilterValue("published")}
                    >
                      Published
                    </Button>
                    <Button size="sm" onClick={() => setFilterValue("draft")}>
                      Draft
                    </Button>
                    <Button size="sm" onClick={() => setFilterValue("")}>
                      Clear
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className=" mb-12 mt-5 w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thumbnail</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    {userRole === "admin" && (
                      <TableHead className="text-right">Action</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allBlogs.map((blog) => (
                    <ContentManagementTableRow
                      key={blog._id}
                      blog={blog}
                      refetch={refetch}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentManagement;
