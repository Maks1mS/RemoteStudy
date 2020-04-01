import News from './News'

export default {
  component: News,
  title: 'News'
}

export const text = (): JSX.Element => <News title="Hello world!" />
