import React from 'react';
import FooterHome from '../components/home/FooterHome';
import { useDispatch } from 'react-redux';
import { setNameTrainer } from '../store/slices/nameTrainer.slice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
    dispatch(setNameTrainer(nameTrainer));
    navigate('/pokedex');
  };

  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen">
      {/* Sección superior */}
      <section className="flex flex-col items-center justify-center py-10">
        <div className="mb-4">
          <img className="h-20" src="/images/logo.png" alt="" />
        </div>
        <h3 className="text-2xl font-bold">Hello, trainer!</h3>
        <p className="text-lg">To start, please enter your name:</p>

        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <input
            required
            id="nameTrainer"
            type="text"
            className="px-4 py-2 mr-2 border border-gray-500 rounded"
          />
          <button className="px-4 py-2 bg-red-600  hover:bg-red-800  text-white rounded">
            Start!
          </button>
        </form>
      </section>

      {/* Sección inferior */}
      <section>
        <FooterHome />
      </section>
    </main>
  );
};

export default Home;
