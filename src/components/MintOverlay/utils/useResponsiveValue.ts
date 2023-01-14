import { useWindowSize } from './useWindownSize';

type ResponsiveConfig<T> = {
  desktop: T;
  tablet: T;
  mobile: T;
};
export function useResponsiveValue<T = any>(config: ResponsiveConfig<T>): T {
  const { width } = useWindowSize();
  if (width > 1000) return config.desktop;
  if (width > 700) return config.tablet;
  return config.mobile;
}
