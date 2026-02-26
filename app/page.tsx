import Header from './components/layout/Header';
import FoodTruckPage from './food-trucks/page';
import HotMenuPage from './hot-menu/page';
import SchedulePage from './schedule/page';

export default function Home() {

  return (
    <div className="grid place-items-center bg-stone-800">
      <main className="max-w-5xl flex-col pb-8 px-8 md:pb-16 md:px-16 sm:items-start">
        <Header />
        <HotMenuPage />
        <hr className='mt-16 w-full border-t-1 border-yellow-100' />
        <SchedulePage />
        <hr className='mt-16 w-full border-t-1 border-yellow-100' />
        <FoodTruckPage />
      </main>
    </div>
  );
}
