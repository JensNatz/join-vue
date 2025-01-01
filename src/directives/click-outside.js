export const vClickOutside = {
  mounted: (el, binding) => {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', el._clickOutside);
  },
  unmounted: (el) => {
    document.body.removeEventListener('click', el._clickOutside);
  },
};
