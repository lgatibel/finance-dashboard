'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';


type IProps = {
  placeholder: string,
}

export default function Search({ placeholder }: IProps) {
  const searchParam = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    console.log(`Searching... ${search}`);

    const query = new URLSearchParams(searchParam);
    query.set('page', '1');
 if (typeof search === 'string' && search.length > 0) {
      query.set('query', search)
    } else {
      query.delete('query')
    }
    replace(pathname + '?' + query)
  }, 500);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={searchParam.get('query')?.toString()}
        onChange={(e) => handleSearch(e)}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
