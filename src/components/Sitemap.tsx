'use server'

const pages = [
  '/counter-hook',
  '/counter',
  '/easy-button',
  '/location',
  '/login-submission',
  '/login',
]

function Sitemap() {
  return (
    <div>
      <div>Please go to the URL for one of the examples:</div>
      <div>
        <ul>
          {pages.map(key => (
            <li key={key}>
              <a href={key}>{key}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sitemap
