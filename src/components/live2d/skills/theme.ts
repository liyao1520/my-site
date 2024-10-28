import { startTransition } from "@/utils/transition";
import { Live2DModelView } from "../assets/sdk/live2d-lip-sync.es";
import { nextTick, Ref } from "vue";


let timer: NodeJS.Timeout
export function toggleTheme(live2dView: Live2DModelView, isDark: Ref<boolean>) {

  const { model, app } = live2dView


  const config = isDark.value ? { motionIndex: 3, delay: 3500 } : { motionIndex: 4, delay: 5000 }
  model.motion('', config.motionIndex)
  clearTimeout(timer)
  timer = setTimeout(() => {
    const { left, top } = app.view.getBoundingClientRect()
    nextTick(() => startTransition(isDark, {
      x: left + 50,
      y: top + 50
    }))

  }, config.delay)
}