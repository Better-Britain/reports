(function () {
  function main() {
    document.body.classList.add('js');
    window.GortonStandoffInteractible?.init?.();
    window.GortonFlyers?.init?.();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
}());

