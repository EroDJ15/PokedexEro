import React from 'react';

const FooterHome = () => {
  return (
    <section className='relative'>
      {/* Sección superior */}
      <div className='bg-red-600 h-16'></div>

      {/* Sección negra */}
      <div className='bg-black h-6'></div>

      {/* Botón POKEBALL */}
      <div className="w-16 p-8 py-4 aspect-square bg-white border-[6px] border-black rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 after:content-[''] after:h-11 after:aspect-square after:bg-red-700 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[7px] after:border-black"></div>
    </section>
  );
};

export default FooterHome;
