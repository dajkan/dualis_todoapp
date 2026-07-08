import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TodoForm from '../TodoForm.vue'

describe('TodoForm', () => {
  it('új feladatot küld el', async () => {
    const wrapper = mount(TodoForm)

    await wrapper.find('input').setValue('Tanulni Vue-t')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-todo')).toBeTruthy()
    expect(wrapper.emitted('add-todo')[0]).toEqual(['Tanulni Vue-t'])
  })

  it('üres feladatot nem küld el', async () => {
    const wrapper = mount(TodoForm)

    await wrapper.find('input').setValue('')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-todo')).toBeFalsy()
  })
})