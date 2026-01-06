import React from "react";

const Footer = () => {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="bg-black/80 text-white/80 absolute w-dvw bottom-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-white/70">
          ©{" "}
          <time suppressHydrationWarning dateTime={String(currentYear)}>
            {currentYear}
          </time>{" "}
          Next Store
        </p>
        <p className="text-white/60">Enjoy your shopping experience.</p>
      </div>
    </footer>
  );
};

export default Footer;
