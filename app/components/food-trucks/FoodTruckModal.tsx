import { Truck } from '@/app/lib/types';
import ImageWrapper from '@/app/components/ui/ImageWrapper';

type Props = {
    truck: Truck;
    onClose: () => void;
};

export default function FoodTruckModal({ truck, onClose }: Props) {
    return (
        <div className='fixed inset-0 z-50 bg-stone-800 flex items-center justify-center overscroll-contain'>
            <div className='
                role="dialog"
                aria-modal="true"
                className="relative max-h-[calc(100dvh-2rem)] bg-white my-auto rounded-2xl max-w-xl text-left text-black shadow-lg overflow-y-scroll"
                '>
                <div className='pt-5 pr-10 pb-10 pl-10'>
                    <div className='w-full'>
                        <div className='text-right pt-5'>
                            <button onClick={onClose}>X</button>
                        </div>
                        <p className='pb-2 mt-[-20px]'>About the Food Truck</p>
                        <h3 className='font-headline text-3xl pb-6'>{truck.truckName}</h3>
                    </div>
                    <div className='w-full flex'>
                        <div className='w-2/5'>
                            <ImageWrapper
                                className='border-4 border-black'
                                src={truck.logo}
                                alt={`${truck.truckName} logo`}
                                width={150}
                                height={150}
                            />
                        </div>
                        <div className='w-3/5'>
                            <p className='text-lg align-middle'>{truck.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}