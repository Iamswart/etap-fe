import { SidebarLink } from "./SidebarLink";
import { Logo } from "@/icons/core";
import { Home, Setting2 } from "iconsax-react";
import { UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SidebarLinkItem = {
  text: string;
  icon: React.ReactElement;
};

type SingleLink = SidebarLinkItem & {
  link: string;
  onClick?: () => void;
};

type NestedLink = SidebarLinkItem & {
  nestedLinks: Array<SingleLink>;
};

type LinkGroup = {
  key: string;
  heading: string;
  links: Array<SingleLink | NestedLink>;
};

export function Sidebar() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const navigateToHome = () => {
    router.push("/");
  };

  const linkGroups: LinkGroup[] = [
    {
      key: "top",
      heading: "MAIN MENU",
      links: [
        {
          link: "/",
          text: "Subjects",
          icon: <Home />,
          onClick: navigateToHome,
        },
        {
          link: "#",
          text: "Log Out",
          icon: <Setting2 />,
          onClick: handleLogout,
        },
      ],
    },
    {
      key: "bottom",
      heading: "USER",
      links: [
        {
          link: "#",
          text: user ? `${user.email}` : "User",
          icon: <UserCircle size={20} strokeWidth={1.5} />,
          
        },
      ],
    },
  ];

  return (
    <div className="no-scrollbar h-full pb-8 lg:min-w-[17rem]">
      <nav className="relative flex flex-col gap-6 h-full">
        <Logo className=" pl-4 pr-5" />

        <ul className="grow flex flex-col overflow-y-scroll pl-4 pr-5 pt-8">
          {linkGroups.map(({ heading, key, links }) => {
            return (
              <li className="py-6 first-of-type:mb-8" key={key}>
                <h2 className="mb-5 px-3 uppercase text-xs text-[#8B909A]">
                  {heading}
                </h2>

                <ul className="space-y-6">
                  {links.map((linkItem) => {
                    

                    if ("link" in linkItem) {
                      return (
                        <SidebarLink
                          key={linkItem.link || linkItem.text}
                          icon={linkItem.icon}
                          link={linkItem.link}
                          text={linkItem.text}
                          onClick={linkItem.onClick}
                        />
                      );
                    }

                    return null;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
