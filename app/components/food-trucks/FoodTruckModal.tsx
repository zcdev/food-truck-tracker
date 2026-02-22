import { Truck } from '@/app/lib/types';
import ImageWrapper from '@/app/components/ui/ImageWrapper';

type Props = {
    truck: Truck;
    onClose: () => void;
};

export default function FoodTruckModal({ truck, onClose }: Props) {
    return (
        <div className='fixed inset-0 z-50 bg-stone-800 flex items-center justify-center mx-4 md:mx-0'>
            <div
                role="dialog"
                aria-modal="true"
                className="modal relative max-h-[calc(100dvh-2rem)] bg-white my-auto rounded-2xl max-w-xl text-left text-black shadow-lg overflow-y-scroll"
                tabIndex={-1}
            >
                <div className='pb-10 pl-10'>
                    <div className='w-full'>
                        <div className='block w-auto text-right text-3xl mt-[-20px] mr-[-10px]'>
                            <button className='p-10' onClick={onClose}>&times;</button>
                        </div>
                        <p className='pb-2 mt-[-50px]'>About the Food Truck</p>
                        <h3 className='font-headline text-3xl pb-6'>{truck.truckName}</h3>
                    </div>
                    <div className='w-full md:flex'>
                        <div className='w-full md:w-2/5'>
                            <ImageWrapper
                                className='modal-img'
                                src={truck.logo}
                                alt={`${truck.truckName} logo`}
                                width={170}
                                height={170}
                            />
                        </div>
                        <div className='w-full md:w-3/5 pt-6 md:pt-0'>
                            <p className='text-lg align-middle pr-10'>{truck.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}