import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icons/pokemon.png";

const Navbar = () => {
    return (
        <nav className="flex flex-col h-16 items-start justify-start bg-blue-950 shadow-lg z-10">
            <Link href={"/"} className="flex items-center gap-2 p-4">
				<Image
					src={logo}
					alt="pokedex icon"
					width={30}
					height={30}
					className="rounded-full"
				/>
                <h1 className="font-extrabold text-2xl text-white">
					Pokédex-TCG
                </h1>
            </Link>
        </nav>

    );
};

export default Navbar;
