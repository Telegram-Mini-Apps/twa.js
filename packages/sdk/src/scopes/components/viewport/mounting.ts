import { isPageReload } from '@telegram-apps/navigation';
import { type EventListener, off, on } from '@telegram-apps/bridge';
import { CancelablePromise } from 'better-promises';

import { defineMountFn } from '@/scopes/defineMountFn.js';

import { wrapBasic } from './wrappers.js';
import {
  COMPONENT_NAME,
  CSA_CHANGED_EVENT,
  FS_CHANGED_EVENT,
  SA_CHANGED_EVENT,
  VIEWPORT_CHANGED_EVENT,
} from './const.js';
import { contentSafeAreaInsets, getStateFromStorage, safeAreaInsets, setState } from './signals.js';
import { requestContentSafeAreaInsets, requestSafeAreaInsets, requestViewport } from './static.js';
import type { State } from './types.js';
import { launchParams } from '@/globals.js';

const onViewportChanged: EventListener<'viewport_changed'> = (data) => {
  const { height } = data;
  setState({
    isExpanded: data.is_expanded,
    height,
    width: data.width,
    stableHeight: data.is_state_stable ? height : undefined,
  });
};

const onFullscreenChanged: EventListener<'fullscreen_changed'> = (data) => {
  setState({ isFullscreen: data.is_fullscreen });
};

const onSafeAreaChanged: EventListener<'safe_area_changed'> = (data) => {
  setState({ safeAreaInsets: data });
};

const onContentSafeAreaChanged: EventListener<'content_safe_area_changed'> = (data) => {
  setState({ contentSafeAreaInsets: data });
};

const [
  fn,
  [, mountPromise, isMounting],
  [, mountError],
  [_isMounted, isMounted],
] = defineMountFn<State>(
  COMPONENT_NAME,
  async abortSignal => {
    const options = { abortSignal };

    // Try to restore the state using the storage.
    const s = isPageReload() && getStateFromStorage();
    if (s) {
      return s;
    }

    // Request all insets.
    const insets = await CancelablePromise.all([
      requestSafeAreaInsets.isAvailable()
        ? requestSafeAreaInsets(options)
        : safeAreaInsets(),
      requestContentSafeAreaInsets.isAvailable()
        ? requestContentSafeAreaInsets(options)
        : contentSafeAreaInsets(),
    ]);

    const lp = launchParams();
    const shared = {
      contentSafeAreaInsets: insets[1],
      isFullscreen: !!lp.tgWebAppFullscreen,
      safeAreaInsets: insets[0],
    };

    // If the platform has a stable viewport, it means we could use the window global object
    // properties.
    if (['macos', 'tdesktop', 'unigram', 'webk', 'weba', 'web'].includes(lp.tgWebAppPlatform)) {
      const w = window;
      return {
        ...shared,
        height: w.innerHeight,
        isExpanded: true,
        stableHeight: w.innerHeight,
        width: w.innerWidth,
      };
    }

    // We were unable to retrieve data locally. In this case, we are
    // sending a request returning the viewport information.
    return requestViewport(options).then(data => ({
      ...shared,
      height: data.height,
      isExpanded: data.is_expanded,
      stableHeight: data.is_state_stable ? data.height : 0,
      width: data.width,
    }));
  },
  (result) => {
    on(VIEWPORT_CHANGED_EVENT, onViewportChanged);
    on(FS_CHANGED_EVENT, onFullscreenChanged);
    on(SA_CHANGED_EVENT, onSafeAreaChanged);
    on(CSA_CHANGED_EVENT, onContentSafeAreaChanged);
    setState(result);
  },
);

/**
 * Mounts the Viewport component.
 * @throws {FunctionNotAvailableError} The environment is unknown
 * @throws {FunctionNotAvailableError} The SDK is not initialized
 * @throws {ConcurrentCallError} The component is already mounting
 * @example
 * if (mount.isAvailable() && !isMounting()) {
 *   await mount();
 * }
 */
export const mount = wrapBasic('mount', fn);

export {
  mountPromise,
  mountError,
  isMounting,
  isMounted,
  _isMounted,
};

/**
 * Unmounts the Viewport.
 */
export function unmount(): void {
  // Cancel mount promise.
  const promise = mountPromise();
  promise && promise.cancel();

  // Remove event listeners.
  off(VIEWPORT_CHANGED_EVENT, onViewportChanged);
  off(FS_CHANGED_EVENT, onFullscreenChanged);
  off(SA_CHANGED_EVENT, onSafeAreaChanged);
  off(CSA_CHANGED_EVENT, onContentSafeAreaChanged);

  // Reset the mount flag.
  _isMounted.set(false);
}