import Header from './components/layout/Header';
import FoodTruckPage from './food-trucks/page';
import HotMenuPage from './hot-menu/page';

export default function Home() {

  return (
    <>
      <div className="flex items-center justify-center bg-stone-800">
        <main className="flex w-full max-w-5xl flex-col items-center justify-center pb-8 px-8 md:pb-16 md:px-16 sm:items-start">
          <Header />
          <HotMenuPage />
          <hr className='mt-16 w-full border-t-2 border-yellow-100' />
          <FoodTruckPage />
        </main>
      </div>
    </>
  );
}
