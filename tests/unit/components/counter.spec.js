import Counter from '@/components/Counter'
import { shallowMount } from '@vue/test-utils'

describe('Counter Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render in h2 tag the default value', () => {
    const h2 = wrapper.find('h2')
    expect(h2.text()).toBe('Contador')
  })
  it('increase counter', async () => {
    const increaseBtn = wrapper.find('button')
    await increaseBtn.trigger('click')
    const p = wrapper.find('[data-test-id="counter"]')
    expect(p.text()).toBe('101')
  })

  it('decrease counter', async () => {
    const increaseBtn = wrapper.findAll('button')
    const btn = increaseBtn[1]
    await btn.trigger('click')
    await btn.trigger('click')

    const p = wrapper.find('[data-test-id="counter"]')
    expect(p.text()).toBe('98')
  })

  it('props default', async () => {
    const wrapper = shallowMount(Counter)
    const { start } = wrapper.props()
    expect(typeof start).toBe('number')
    const p = wrapper.find('[data-test-id="counter"]')
    expect(+p.text()).toBe(start)
  })

  it('change props title', async () => {
    const title = 'Hola mundo'
    const wrapper = shallowMount(Counter, { props: { title } })
    const h2 = wrapper.find('h2').text()
    expect(h2).toBe(title)
  })
})
