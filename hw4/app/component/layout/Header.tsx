import Image from "next/image";
import Link from "next/link";

export default function Header(){
    return (
        <div>
            <header className="bg-[#002F34] shadow py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href='/'>
                        <Image src="/logo.png" alt="Logo" width={70} height={40} />
                    </Link>
                    <Link href="/adding" className="bg-white hover:bg-[#002F34] hover:text-white hover:
                    border-2 font-bold py-2 px-4 rounded text-[#002F34]">
                        Подать объявление
                    </Link>
                </div>
            </header>
        </div>
    )
}