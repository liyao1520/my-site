import { defineComponent, ref, onMounted } from 'vue'

const ClientOnly = defineComponent({
  setup(_, { slots }) {
    const show = ref(false)

    onMounted(() => {
      show.value = true
    })
    return () => (show.value && slots.default ? slots.default() : null)
  }
})
export default ClientOnly