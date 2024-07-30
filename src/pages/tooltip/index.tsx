import cx from '../../components/tooltip/cx';
import Tooltip2 from '../../components/tooltip/tooltip2';
import { cn } from '../../utils/cn';

const TooltipPage = () => {
  return (
    <main className={cn('flex flex-col gap-y-4', cx('Tooltips'))}>
      <Tooltip2 />
    </main>
  );
};

export default TooltipPage;
