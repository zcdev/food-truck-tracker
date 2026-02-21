import Image from 'next/image';
import { ImageProps } from 'next/image';

export default function ImageWrapper({
    src,
    alt,
    className,
    width = '150',
    height = '150',
}: ImageProps) {
    return (
        <div className='truck-img'>
            <Image
                src={src}
                alt={alt || ""}
                width={width}
                height={height}
                className={className}
                style={{ borderRadius: '100%' }}
                fetchPriority="high"
                priority
            />
        </div>
    );
}
