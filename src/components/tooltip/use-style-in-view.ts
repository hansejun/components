import { RefObject, useLayoutEffect, useState } from 'react';
import { useViewportRect } from './viewport-context';

type PositionKey = 'left' | 'right' | 'top' | 'bottom';
type Position = Partial<Record<PositionKey, string | number>>;

export default function useStyleInView(
  wrapperRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  position: Position,
) {
  const viewportRect = useViewportRect();
  const [style, setStyle] = useState<Position>({});

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return;
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    const targetRect = targetRef.current?.getBoundingClientRect();

    // wrapper의 가장 밑 위치 + target의 높이가 viewport의 높이보다 작으면 top, 아니면 bottom
    const verticalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? 'top'
        : 'bottom';

    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? 'left'
        : 'right';

    setStyle({
      [verticalKey]: position[verticalKey] || 0,
      [verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
      [horizontalKey]: position[horizontalKey] || 0,
      [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
    });
  }, [
    targetRef,
    wrapperRef,
    position,
    viewportRect.height,
    viewportRect.width,
  ]);

  return { style };
}
