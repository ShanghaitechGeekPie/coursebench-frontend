import { inject, onMounted, onUnmounted } from 'vue';

export default () => {
  const menuBarStatus = inject('menu');

  onMounted(() => {
    updateMenuStatus();
    window.addEventListener('resize', updateMenuStatus, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateMenuStatus, { passive: true });
  });

  const updateMenuStatus = () => {
    menuBarStatus.drawer =
      window.innerWidth >= 600 ? false : menuBarStatus.drawer;
  };

  return { menuBarStatus };
};
