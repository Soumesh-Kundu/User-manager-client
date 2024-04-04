import NewButton from "./Client/NewButton";

export default function Navbar() {
  return (
    <header className="bg-slate-300/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-4 xl:px-0 py-5 bg-slate-300">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          User Manager
        </h3>
        <NewButton />
      </nav>
    </header>
  );
}
