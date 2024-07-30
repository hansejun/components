import data from './data';
import cx from './cx';
import ViewportContextProvider from './viewport-context';
import { useRef } from 'react';
import useStyleInView from './use-style-in-view';

const tooltipPosition = {
  top: '100%',
  bottom: 20,
  left: 0,
  right: 0,
};

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { style } = useStyleInView(wrapperRef, targetRef, tooltipPosition);

  return (
    <details ref={wrapperRef} className={cx('details')} data-tooltip={id}>
      <summary className={cx('summary')} data-tooltip-summary>
        {title}
      </summary>
      <div
        ref={targetRef}
        className={cx('tooltip')}
        onClick={e => e.stopPropagation()}
        style={style}
      >
        {description}
      </div>
    </details>
  );
};

const Tooltip2 = () => {
  return (
    <ViewportContextProvider>
      <div className={cx('container')}>
        <h3>#3. Tooltip</h3>
        {data.map(d => (
          <Tooltip {...d} key={d.id} />
        ))}
      </div>
    </ViewportContextProvider>
  );
};

export default Tooltip2;
