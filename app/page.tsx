// app/page.tsx
import PageContent from "./page.mdx";
import { SkeletonImage } from "@/components/SkeletonImage";

export default function Page() {
  return (
    <PageContent components={{ SkeletonImage }} />
  );
}
