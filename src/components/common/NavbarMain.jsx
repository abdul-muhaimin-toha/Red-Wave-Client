import { Link } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ThemeToggler from "../theme/ThemeToggler";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import useAuth from "@/hooks/auth/useAuth";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";

const NavbarMain = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast({
          title: "Successfully logged out!",
        });
      })
      .catch((error) => {
        console.error(error.message);
        toast({
          title: "Something went wrong!",
          description: `${error.message}`,
        });
      });
  };

  return (
    <nav
      className={`fixed z-50 w-full transform border-b-4 bg-background transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto max-w-screen-2xl px-4 ">
        <div className="flex items-center justify-between gap-6 py-5 md:gap-4 lg:gap-6">
          <div className="flex items-center gap-16 md:gap-14 lg:gap-24">
            <div className="flex items-center justify-center gap-4">
              <Sheet>
                <SheetTrigger className="flex h-8 w-8 items-center justify-center md:hidden">
                  <HamburgerMenuIcon className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="flex md:hidden">
                  <SheetHeader className="w-full">
                    <SheetTitle className="my-8">
                      <Link to="/">
                        <h3 className="font-bold uppercase text-primary">
                          Red Wave
                        </h3>
                      </Link>
                    </SheetTitle>
                    <div>
                      <div className="flex list-none flex-col text-left text-sm font-medium uppercase text-primary">
                        <div className=" border-b-2 px-2 py-5 transition-all duration-200 hover:text-primary/70">
                          <Link to="/">Home</Link>
                        </div>
                        <div className=" border-b-2 px-2 py-5 transition-all duration-200 hover:text-primary/70">
                          <Link to="/blood-donation-requests">
                            Donation Requests
                          </Link>
                        </div>
                        <div className=" border-b-2 px-2 py-5 transition-all duration-200 hover:text-primary/70">
                          <Link to="/blogs">Blog</Link>
                        </div>
                        {user && (
                          <div className=" border-b-2 px-2 py-5 transition-all duration-200 hover:text-primary/70">
                            <Link to="/funds">Fundings</Link>
                          </div>
                        )}
                        {!user && (
                          <div className=" border-b-2 px-2 py-5 transition-all duration-200 hover:text-primary/70">
                            <Link to="/registration">Registration</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              <Link to="/">
                <h3 className="font-bold uppercase text-primary">Red Wave</h3>
              </Link>
            </div>
            <div className="hidden list-none gap-6 text-xs font-medium uppercase text-primary md:flex">
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link to="/">Home</Link>
              </div>
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link to="/blood-donation-requests">Donation Requests</Link>
              </div>
              <div className="transition-all duration-200 hover:text-primary/70">
                <Link to="/blogs">Blog</Link>
              </div>
              {user && (
                <div className="transition-all duration-200 hover:text-primary/70">
                  <Link to="/funds">Fundings</Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <ThemeToggler />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 overflow-hidden  rounded-full outline outline-1 outline-primary"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user?.photoURL}
                        className="h-7 w-7 rounded-full"
                      />
                      <AvatarFallback>
                        {user?.displayName?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-6 w-56"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to="/dashboard">
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex list-none gap-4 text-primary">
                <Link to="/sign-in">
                  <Button variant="default" className="text-xs uppercase">
                    Join In
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button
                    variant="default"
                    className="hidden text-xs uppercase md:block"
                  >
                    Registration
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
