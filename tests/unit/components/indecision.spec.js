import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision component', () => {
  const answer = 'yes'
  const forced = false
  const image = 'https://yesno.wtf/assets/yes/2.gif'

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer,
          forced,
          image
        })
    })
  )

  it('should match the snapshot', async () => {
    const wrapper = shallowMount(Indecision).html()
    expect(wrapper).toMatchSnapshot()
  })
  it('nothing should be executed when typing', async () => {
    const wrapper = shallowMount(Indecision)
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
    const input = wrapper.find('input')
    const clsSpy = jest.spyOn(console, 'log')
    await input.setValue('Hola mundo')
    expect(clsSpy).toHaveBeenCalled()
    expect(getAnswerSpy).not.toHaveBeenCalled()
  })

  it('The writing "?" I should run the getAnswer', async () => {
    const wrapper = shallowMount(Indecision)
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
    const input = wrapper.find('input')
    const clsSpy = jest.spyOn(console, 'log')
    await input.setValue('Hola mundo?')
    expect(clsSpy).toHaveBeenCalled()
    expect(getAnswerSpy).toHaveBeenCalled()
  })

  it('getAnswer', async () => {
    const wrapper = shallowMount(Indecision)
    await wrapper.vm.getAnswer()
    expect(wrapper.vm.image).toBe(image)
    expect(wrapper.vm.answer).toBe('Si')
    const input = wrapper.find('input')
    await input.setValue('Hola mundo?')
    const img = wrapper.find('img')
    expect(img.exists()).toBeTruthy()
    expect(img.element.src).toBe(image)
  })

  it('error getAnswer', async () => {
    const wrapper = shallowMount(Indecision)
    fetch.mockImplementationOnce(() => Promise.reject('error'))
    await wrapper.vm.getAnswer()
    expect(wrapper.vm.answer).toBe('error')
  })
})
