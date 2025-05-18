"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = ({ profile }: { profile?: string }) => {
  const pathname = usePathname();

  // Check if the current path is the preview page
  const isPreviewPage = pathname === "/cause/See_Preview";
  // Replace with the correct path for your preview page
  const userProfile = profile === "" || profile === undefined ? "/list_a_cause/profile.svg" : profile
  return (
    <nav className=" w-full px-6 py-3 h-16 flex items-center justify-between bg-white shadow-md fixed z-50">
      {/* Back Link */}
      <button onClick={() => window.history.back()} className="text-black text-sm flex items-center">
        <Image src="/list_a_cause/leftarrow.svg" alt="Back" width={15} height={15} className="mr-1" />
        Back
      </button>

      {/* Logo or Preview Text */}
      <div className="flex-1 flex justify-center">
        {isPreviewPage ? (
          <div className="flex">
            <Image src="/list_a_cause/exclamationtriangle.svg" alt="Warning" width={15} height={15} className="mx-2" />
            <span className="text-xs font-semibold text-[#CC7914]">This is a preview of how the page would look when live</span>
          </div>

        ) : (
          <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />
        )}
      </div>

      {/* Profile */}
      <div className="flex items-center space-x-2">
        {isPreviewPage ? (
          <div className="flex">
            <Link href={"/dashboard/UserProfile"}>
              <Image src={userProfile} alt="Profile" width={40} height={40} className="rounded-full hidden" />
            </Link>
          </div>

        ) : (
          <Link href={"/dashboard/UserProfile"}>
            <Image src={userProfile} alt="Profile" width={40} height={40} className="rounded-full aspect-square" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
