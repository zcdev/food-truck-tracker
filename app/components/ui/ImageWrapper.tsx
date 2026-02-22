import Image from 'next/image';
import { ImageProps } from 'next/image';

export default function ImageWrapper({
    src,
    alt,
    width = '200',
    height = '200',
}: ImageProps) {
    return (
        <div className='img-wrapper'>
            <Image
                src={src}
                alt={alt || ""}
                width={width}
                height={height}
                fetchPriority="high"
                priority
            />
        </div>
    );
}
