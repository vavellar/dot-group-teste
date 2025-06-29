import { onMounted, onUnmounted } from 'vue'

export function useBodyScroll() {
    const disableScroll = () => {
        document.body.style.overflow = 'hidden'
    }

    const enableScroll = () => {
        document.body.style.overflow = 'auto'
    }

    return {
        disableScroll,
        enableScroll
    }
}
