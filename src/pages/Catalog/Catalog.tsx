import { Dropdown } from '@/components/molecules/Dropdown';
import { useSearchParams } from 'react-router-dom';

export function Catalog({ category }: { category: string }) {
  const sortOptions = [
    { label: 'Newest', value: 'age' },
    { label: 'Alphabetically', value: 'title' },
    { label: 'Cheapest', value: 'price' },
  ];
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';

  const handleParamChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div>
      <h1>{category}</h1>
      <Dropdown
        label="Sort by"
        value={sort}
        onChange={val => handleParamChange('sort', val)}
        options={sortOptions}
      />
    </div>
  );
}
