import React from 'react';

const FooterHome = () => {
  return (
    <section className="relative p-0.5">
      <footer className="flex flex-col items-center py-4">
        <p className="text-gray-400 text-xs font-semibold">
          &copy; 2023 Todos los derechos reservados
        </p>
        <a
          href="https://github.com/EroDJ15"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 text-xs font-semibold flex items-center mt-1 p-1"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/000000/github.png"
            alt="github"
            className="w-4 h-4 mr-2 opacity-30"
          />
          Created by: Jerovic Pino
        </a>
      </footer>

      {/* Sección superior */}
      <div className="bg-red-600 h-14"></div>

      {/* Sección negra */}
      <div className="bg-black h-[4vh] sm:hidden"></div>

      {/* Botón POKEBALL */}
      <div className="w-16 p-8 py-4 aspect-square bg-white border-[6px] border-black rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 after:content-[''] after:h-11 after:aspect-square after:bg-red-700 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[7px] after:border-black"></div>
    </section>
  );
};

export default FooterHome;
