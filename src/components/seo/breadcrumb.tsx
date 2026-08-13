import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import SchemaMarkup from './schema-markup';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [
    { name: 'Home', url: 'https://kodetocareer.com' },
    ...items
  ];

  const schemaItems = allItems.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `https://kodetocareer.com${item.url}`
  }));

  return (
    <>
      <SchemaMarkup
        type="BreadcrumbList"
        data={{ itemListElement: schemaItems }}
      />
      <nav aria-label="Breadcrumb" className="py-2 overflow-x-auto no-scrollbar">
        <ol className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold whitespace-nowrap">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index === 0 ? (
                  <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span>Home</span>
                  </Link>
                ) : isLast ? (
                  <span className="text-slate-800 font-bold max-w-[200px] sm:max-w-[300px] truncate" title={item.name}>
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.url} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                )}
                {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
