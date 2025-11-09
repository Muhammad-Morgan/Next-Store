import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop!
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
          expedita illo ea facilis fugiat officiis similique aspernatur sapiente
          inventore dolore!
        </p>
        <Button asChild size={"lg"} className="mt-10">
          <Link href={"/products"}>our products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
};

export default Hero;
