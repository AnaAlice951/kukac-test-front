import { BsInstagram, BsGithub } from "react-icons/bs";
import Header from "../components/header/Hearder";
import kukacLogo from "../assets/programador-trabalhando.jpg";

export function Home() {
  const instagramURL = "https://www.instagram.com/anaalice951";
  const gitHubURL = "https://www.instagram.com/anaalice951";
  return (
    <>
      <Header />
      <div className="w-full h-full font-architectsDaughter flex justify-between items-start p-10 lg:p-20 overflow-y-auto">
        <div className="flex flex-col h-full gap-5 lg:gap-20 w-full justify-center">
          <p className="font-bold text-[70px] lg:text-[90px] text-black_75">
            Teste Técnico Kukac
          </p>
          <p className="font-bold text-[30px] lg:text-[35px]  text-black_75">
            by Ana Alice
          </p>
          <div className="flex flex-row gap-5 w-5 h-5">
            <a
              href={instagramURL}
              className="h-3 w-9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram />
            </a>
            <a href={gitHubURL} target="_blank" rel="noopener noreferrer">
              <BsGithub />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
