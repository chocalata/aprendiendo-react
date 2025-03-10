import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'chocalata227',
    name: 'Catalin Trandafir',
    site: 'x',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    site: 'x',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    site: null,
    isFollowing: true
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    site: '',
    isFollowing: false
  }
]

export function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, site, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            site={site}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}
