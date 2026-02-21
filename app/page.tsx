import Header from './components/layout/Header';
import FoodTruckPage from './food-trucks/page';

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-stone-800">
      <main className="flex w-full max-w-5xl flex-col items-center justify-center pb-16 px-16 sm:items-start">
        <Header />
        <FoodTruckPage />
      </main>
    </div>
  );
}
