import {
  createContext,
  ReactNode,
  useContext,
  useSyncExternalStore,
} from 'react';

// DOMRect => getBoundingClientRect() 메서드로 반환되는 객체 타입
type Rect = Pick<DOMRect, 'top' | 'left' | 'width' | 'height'> & {
  scrollHeight: number;
};

const DefaultRect: Rect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const rectKeys: (keyof Rect)[] = [
  'top',
  'left',
  'width',
  'height',
  'scrollHeight',
];

const isSameRect = (prev: Rect, next: Rect) => {
  return rectKeys.every(key => prev?.[key] === next?.[key]);
};

/**
 * 클로저를 사용한 이유:
 * 객체이기 때문에 값이 변경되지 않아도 새로운 객체가 생성되기 때문에.
 * 값이 변경되지 않은 경우에는 기존 값을 유지하기 위해.
 */

const getViewportRect = () => {
  let rect: Rect = DefaultRect;

  return () => {
    const element =
      typeof document !== 'undefined' && document.scrollingElement;

    if (!element) return rect;

    const { left, top, width, height } = element.getBoundingClientRect();
    const scrollHeight = element.scrollHeight;

    const newRect = {
      top,
      left,
      width,
      height,
      scrollHeight,
    };

    if (newRect && !isSameRect(rect, newRect)) {
      rect = newRect;
    }

    return rect;
  };
};

const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);
  window.addEventListener('scroll', callback);
  resizeObserver.observe(document.body);

  return () => {
    resizeObserver.disconnect();
    window.removeEventListener('scroll', callback);
  };
};

const ViewportContext = createContext<Rect>(DefaultRect);

const ViewportContextProvider = ({ children }: { children: ReactNode }) => {
  const viewportRect = useSyncExternalStore(subscribe, getViewportRect());

  return (
    <ViewportContext.Provider value={viewportRect}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportContextProvider;

export const useViewportRect = () => useContext(ViewportContext);
