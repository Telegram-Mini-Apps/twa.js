import {
  createWrapSafe,
  type SafeWrapFn,
} from '@/scopes/toolkit/createWrapSafe.js';
import type { IsSupported } from '@/scopes/toolkit/wrapSafe.js';

export function createWrapSafeSupported(
  component: string,
  isSupported: IsSupported,
): SafeWrapFn<true> {
  return createWrapSafe(component, { isSupported });
}