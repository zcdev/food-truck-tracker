'use client';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    query: string;
};

export default function SearchInput({ onChange, onKeyDown, query }: Props) {
    return (
        <div className='search-input max-w-sm my-6 md:mb-10'>
            <input
                id='search'
                type='text'
                placeholder='Enter what you are craving now'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={query}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete="off"
                aria-label='Enter what you are craving now'
            />
        </div>
    );
}
