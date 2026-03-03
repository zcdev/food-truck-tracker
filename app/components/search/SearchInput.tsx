'use client';

type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    query: string;
};

export default function SearchInput({ onChange, query }: Props) {
    return (
        <div className='search-input mb-6 md:mb-10'>
            <input
                id='search'
                type='text'
                placeholder='What are you craving now?'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={query}
                onChange={onChange}
            />
        </div>
    );
}
