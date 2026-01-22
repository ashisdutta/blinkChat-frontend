import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* nav bar start here  */}
      <div className=" flex border-b justify-between mt-3">
        <img src="/logo.png" alt="logo" className="h-12 w-auto" />
        <div>
          <Link href={"/about"} className="mx-2">
            About
          </Link>
          <Link href={"/contactus"} className="mx-2">
            contact us
          </Link>
        </div>
      </div>
      {/* nav bar end here  */}
      <div className="flex justify-around">
        <div className="mt-40">
          <div className="max-w-lg space-y-8">
            <h1 className="text-6xl font-extrabold tracking-tight text-primary">
              Your World, Live.
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Create rooms, invite your crew, and keep the conversation flowing.
              From deep talks to quick gossip, BlinkChat is your space to be
              heard.
            </p>
            <h4 className="text-lg font-semibold text-indigo-600 my-3">
              Create your world...
            </h4>
          </div>
          <div className="ml-2 flex gap-4">
            <Link
              href="/signup"
              className="bg-black text-white border rounded-d shadow-xs hover:cursor-pointer"
            >
              <Button size="lg">get started</Button>
            </Link>

            <Link href="/signin" className="hover:cursor-pointer">
              <Button variant="outline" size="lg">
                login
              </Button>
            </Link>
          </div>
        </div>
        <video autoPlay loop muted playsInline className="max-w-md">
          <source src="/frontpage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
