import Image from 'next/image';
import { ImageProps } from 'next/image';

export default function ImageWrapper({
    src,
    alt,
    width = '150',
    height = '150',
}: ImageProps) {
    return (
        <div className='img-wrapper'>
            <Image
                src={src}
                alt={alt || ""}
                width={width}
                height={height}
                style={{ borderRadius: '100%' }}
                fetchPriority="high"
                priority
            />
        </div>
    );
}
