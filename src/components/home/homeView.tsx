import Benefits from "./benefits";
import Categories from "./categories";
import Hero from "./hero";
import NewArrivals from "./newArrivals";

export default async function HomeView() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <Benefits />
      <div className="mt-20 flex items-center justify-between py-10 border-t">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nixa. All rights reserved.
        </p>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </>
  );
}
