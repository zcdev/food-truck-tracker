type Props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (e: React.SubmitEvent<HTMLFormElement>) => void;
    query: string;
};

export default function SearchInput({ onChange, onSubmit, query }: Props) {

    return (
        <div className='search-input max-w-sm my-6 md:mb-10 mx-auto md:mx-0'>
            <form onSubmit={onSubmit} className="flex items-end">
                <input
                    id='search'
                    type='text'
                    placeholder='What you are craving now?'
                    className='flex w-full text-[17px] md:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 mr-4'
                    value={query}
                    onChange={onChange}
                    autoComplete="off"
                    aria-label='What you are craving now'
                />
                <input type='submit' value='Search' className='flex mt-2 w-auto text-sm md:text-lg text-white font-bold bg-orange-700 rounded-lg hover:bg-orange-500 px-4 py-3' />
            </form>
        </div>
    );
}
