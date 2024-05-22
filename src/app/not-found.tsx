import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Not Found
      </h2>
      <p className="text-sm text-muted-foreground pt-3 px-2 ">
        Could not find requested resource
      </p>
      <Button
        variant={"outline"}
        className="flex flex-row items-center justify-center gap-2 w-fit mt-8"
        asChild
      >
        <Link href="/" className="text-sm">
          Return Home
        </Link>
      </Button>
    </div>
  );
}
