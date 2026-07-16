import { Truck } from '@/app/lib/types';
import ImageWrapper from '@/app/components/ui/ImageWrapper';
import { useState, useEffect, useRef } from 'react';

type Props = {
    truck: Truck;
    isModalOpen: Boolean;
    onClose: () => void;
};

export default function FoodTruckModal({ truck, isModalOpen, onClose }: Props) {
    const [closeOnBackdrop, setCloseOnBackdrop] = useState(true);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const prevActiveRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isModalOpen) return;

        prevActiveRef.current = document.activeElement as HTMLElement | null;

        const dialog = dialogRef.current;
        const selectors =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusable =
            dialog?.querySelector<HTMLElement>(selectors) ?? dialog ?? null;
        firstFocusable?.focus?.();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                onClose();
                return;
            }
            if (e.key === "Tab" && dialog) {
                const items = Array.from(
                    dialog.querySelectorAll<HTMLElement>(selectors)
                ).filter((el) => !el.hasAttribute("disabled"));
                if (items.length === 0) {
                    e.preventDefault();
                    (dialog as HTMLElement).focus();
                    return;
                }
                const first = items[0];
                const last = items[items.length - 1];
                const active = document.activeElement as HTMLElement | null;
                if (!e.shiftKey && active === last) {
                    e.preventDefault();
                    first!.focus();
                } else if (e.shiftKey && active === first) {
                    e.preventDefault();
                    last!.focus();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            // restore focus to the element that opened the modal
            prevActiveRef.current?.focus?.();
        };
    }, [isModalOpen, onClose]);

    if (!isModalOpen) return null;

    // Backdrop close (on mousedown to avoid drag/select oddities)
    const onOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!closeOnBackdrop) return;
        if (e.target === overlayRef.current) onClose();
    };

    return (
        <div className='fixed inset-0 z-50 bg-stone-800 flex items-center justify-center mx-4 md:mx-0'
            ref={overlayRef}
            onMouseDown={onOverlayMouseDown}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                className="modal relative max-h-[calc(100dvh-2rem)] bg-white my-auto rounded-2xl md:max-w-xl text-left text-black shadow-lg overflow-x-hidden overflow-y-scroll"
                ref={dialogRef}
                tabIndex={-1}
            >
                <div className='pb-10 pl-10'>
                    <div className='w-full'>
                        <div className='block w-auto text-right text-3xl mt-[-20px] mr-[-10px]'>
                            <button className='p-10' onClick={onClose} aria-label="Close modal">&times;</button>
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