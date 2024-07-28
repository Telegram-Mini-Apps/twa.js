import { on } from '@/bridge/events/listening/on.js';
import { off } from '@/bridge/events/listening/off.js';
import { isPageReload } from '@/navigation/isPageReload.js';
import { getStorageValue, setStorageValue } from '@/storage/storage.js';
import { decorateWithSupports } from '@/components/utilities/decorateWithSupports.js';
import { createSignal } from '@/signals/utils.js';
import { postEvent } from '@/components/globals.js';
import type { MiniAppsEventListener } from '@/bridge/events/types.js';
import type { RemoveEventListenerFn } from '@/events/types.js';

const MINI_APPS_METHOD = 'web_app_setup_back_button';
const CLICK_EVENT = 'back_button_pressed';

/**
 * fixme
 * @see Usage: https://docs.telegram-mini-apps.com/platform/back-button
 * @see API: https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk/components/back-button
 */

export const isVisible = createSignal(false, {
  set(value) {
    if (this.get() !== value) {
      postEvent()(MINI_APPS_METHOD, { is_visible: value });
      setStorageValue('bb', { isVisible: value });
    }
    this.set(value);
  },
});

/**
 * Hides the back button.
 */
export const hide = decorateWithSupports((): void => isVisible.set(false), MINI_APPS_METHOD);

/**
 * Add a new back button click listener.
 * @param fn - event listener.
 * @returns A function to remove bound listener.
 */
export function onClick(fn: MiniAppsEventListener<'back_button_pressed'>): RemoveEventListenerFn {
  return on(CLICK_EVENT, fn);
}

/**
 * Removes the back button click listener.
 * @param fn - an event listener.
 */
export function offClick(fn: MiniAppsEventListener<'back_button_pressed'>): void {
  off(CLICK_EVENT, fn);
}

/**
 * Restores the back button state using previously saved one in the local storage.
 */
export function restore(): void {
  isVisible.set((isPageReload() && getStorageValue('bb') || { isVisible: false }).isVisible);
}

/**
 * Shows the back button.
 */
export const show = decorateWithSupports((): void => isVisible.set(true), MINI_APPS_METHOD);