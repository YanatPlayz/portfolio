import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-2 py-8 flex flex-col gap-3 items-center">
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <div className="text-3xl lg:text-8xl font-bold">404</div>
          <p className="text-muted-foreground text-lg">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
}
