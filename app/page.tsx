// app/page.tsx
import PageContent from "./page-content.mdx";
import { SkeletonImage } from "@/components/SkeletonImage";

export default function Page() {
  return (
    <PageContent components={{ SkeletonImage }} />
  );
}
