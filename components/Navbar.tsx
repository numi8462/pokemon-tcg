import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icons/poket.png";

const Navbar = () => {
    return (
        <nav className="flex flex-col items-start justify-start bg-blue-950 sticky top-0 w-[100dvw] shadow-lg">
            <Link href={"/"} className="flex items-center gap-2 p-4">
				<Image
					src={logo}
					alt="pokedex icon"
					width={40}
					height={40}
					className="rounded-full"
				/>
                <h1 className="font-extrabold text-3xl text-white">
					Pokédex-TCG
                </h1>
            </Link>
        </nav>

    );
};

export default Navbar;
