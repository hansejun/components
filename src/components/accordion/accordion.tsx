import { accordionData } from './data';
import { cn } from '../../utils/cn';

/**
 * name 속성을 넣으면 여러개의 accordion을 하나만 열 수 있게 함
 * open 속성을 넣으면 최상위 하나만 열린채로 시작
 * details 요소는 열림 닫힘 사이에 변경될 때마다 toggle이라는 이벤트가 발생
 */

const AccordionItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <details name="test" className={cn('overflow-hidden')} open>
      <summary className="font-semibold text-lg whitespace-pre-line break-all p-4 cursor-pointer bg-slate-200 border-b border-slate-300">
        {title}
      </summary>
      <div className={cn('bg-slate-50 p-4 transition-all duration-300')}>
        {description}
      </div>
    </details>
  );
};

export default function Accordion() {
  return (
    <div className="flex flex-col gap-y-4 max-w-[500px]">
      <h2 className="text-xl font-semibold">Accordion</h2>
      <ul>
        {accordionData.map(item => (
          <AccordionItem
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
    </div>
  );
}
