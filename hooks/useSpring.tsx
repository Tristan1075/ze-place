import {useEffect, useMemo} from 'react';
import {Animated} from 'react-native';

export interface SpringAnimationConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

const useSpring = (
  value: {to: number},
  config?: SpringAnimationConfig,
): Animated.Value => {
  const animatedValue = useMemo(() => new Animated.Value(value.to), []);
  useEffect(() => {
    const animation = Animated.spring(animatedValue, {
      ...config,
      toValue: value.to,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [value.to]);
  return animatedValue;
};

export default useSpring;
