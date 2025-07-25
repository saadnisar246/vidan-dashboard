import Link from "next/link";
import Image from "next/image";

// import * as Icons from "@acme/ui/icons";

// import { siteConfig } from "~/app/config";
// import { SiteFooter } from "~/components/footer";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
        <div className="invisible lg:visible relative">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url(/images/others/sider.png)",
                // "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            }}
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" /> */}
          <div
            className="absolute z-20 flex flex-col justify-between items-start gap-y-10 text-lg font-bold tracking-tight p-20"
          >
            {/* <Icons.Logo className="mr-2 h-6 w-6" /> */}
            <Link href={"/"}>
              <Image
                src="/images/vidan-logo.png"
                alt="Vidan AI Logo"
                width={500}
                height={500}
                className="w-50 h-15"
              />
            </Link>
            {/* <span>{"Liqteq"}
            </span> */}
            <p className="text-4xl md:text-5xl font-medium text-white tracking-wider">Solutions for Security, Access, Safety, Search and Health</p>
            <p className="text-xl text-white tracking-wider">AI-enabled Video Intelligence Platform.</p>
          </div>
        </div>

        <div className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
          {props.children}
        </div>
      </div>
      {/* <SiteFooter className="border-none" /> */}
    </>
  );
}