export const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('mousedown', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('mousedown', el.clickOutsideEvent);
  }
};
