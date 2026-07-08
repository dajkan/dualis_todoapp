import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TodoItem from '../TodoItem.vue'

describe('TodoItem', () => {
  const todo = {
    id: '1',
    title: 'Teszt feladat',
    completed: false
  }

  it('megjeleníti a feladat címét', () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    expect(wrapper.text()).toContain('Teszt feladat')
  })

  it('toggle eseményt küld checkbox változáskor', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    await wrapper.find('input[type="checkbox"]').trigger('change')

    expect(wrapper.emitted('toggle-todo')).toBeTruthy()
  })

  it('delete eseményt küld törléskor', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo }
    })

    await wrapper.find('.danger').trigger('click')

    expect(wrapper.emitted('delete-todo')).toBeTruthy()
    expect(wrapper.emitted('delete-todo')[0]).toEqual(['1'])
  })
})