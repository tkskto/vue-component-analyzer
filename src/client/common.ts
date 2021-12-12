const FOCUSABLE_ELEMENTS = 'a, button, summary';

/**
 * disable tabindex behind dialog
 * @param selector
 */
export const disableTabIndex = (selector?: string): void => {
  let targets = Array.from(document.querySelectorAll(FOCUSABLE_ELEMENTS));

  if (selector) {
    targets = targets.filter((elm) => elm.closest(selector) === null);
  }

  targets.forEach((target) => {
    target.classList.add('-focus-disabled');
    target.setAttribute('tabindex', '-1');
  });
};

/**
 * reset tabindex
 */
export const resetTabIndex = (): void => {
  const targets = document.querySelectorAll('.-focus-disabled');

  targets.forEach((elm) => {
    elm.classList.remove('-focus-disabled');
    elm.removeAttribute('tabindex');
  });
};
