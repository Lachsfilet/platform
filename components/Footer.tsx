import Link from "next/link"
import { BsTwitterX, BsYoutube, BsDiscord, BsGithub } from "react-icons/bs";


export default function Footer() {
  return (
    <div>
      <div className="text-center pt-[40px] pb-4">
        Found a mistake? Let us know on the <Link href='https://github.com/NizarAbiZaher/platform'><span className="text-blue-500 underline">GitHub Page</span><span className="text-2xl">☺</span></Link>
      </div>
      <div className="flex items-center justify-center space-x-4 mb-8 text-3xl">
        <Link href='https://github.com/NizarAbiZaher' className="hover:opacity-75" >
          <BsGithub />
        </Link>
        <Link href='https://discord.gg/BuyRn4Pde2' className="hover:opacity-75">
          <BsDiscord />
        </Link>
        <Link href='https://twitter.com/NizzyABI' className="hover:opacity-75">
          <BsTwitterX />
        </Link>
        <Link href='https://youtube.com/@NizzyABI?si=2_03Bzd5q2jtInbB' className="hover:opacity-75">
          <BsYoutube />
        </Link>
      </div>
    </div>
  )
}
