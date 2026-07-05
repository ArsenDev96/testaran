import HomePageClient from "@/components/home/HomePageClient";
import { homeContent } from "@/lib/home-content";

export default function Home() {
  return <HomePageClient locale="hy" content={homeContent.hy} />;
}