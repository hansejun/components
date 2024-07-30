import { useEffect } from 'react';
import data from './data';

const TooltipItem = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <details
      name="id"
      data-summary={id}
      className="relative cursor-pointer hover:bg-zinc-100"
    >
      <summary className="">{title} i</summary>
      <p className="fixed p-2 bg-zinc-600 w-[500px]">{description}</p>
    </details>
  );
};

export default function Tooltip() {
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isParent = target.parentElement?.tagName === 'DETAILS';

      if (target.tagName !== 'DETAILS' && !isParent) {
        const details = document.querySelectorAll('details');
        details.forEach(detail => {
          detail.removeAttribute('open');
        });
      }
    };

    window.addEventListener('click', clickOutside);

    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, []);

  return (
    <div className="flex w-full bg-red-200 h-fit">
      {data.map(item => (
        <TooltipItem key={item.id} {...item} />
      ))}
    </div>
  );
}
