import React from 'react'
import fetch from 'fetch-jsonp'
import { createStream, map, tap, path, debounce } from '@pewpewpew/core'
import { bind } from '@pewpewpew/react'
import Job from './job.jsx'

function App({ searchString, onSearchChange, results }) {
  return (
    <div>
      <section>
        <h1>Github job listing</h1>
        <article>
          <div>
            <label>
              <div>Search:</div>
              <input
                type="text"
                value={searchString}
                onChange={onSearchChange}
              />
            </label>
          </div>
        </article>
      </section>
      <div>{results.map(result => <Job job={result} key={result.id} />)}</div>
    </div>
  )
}

async function searchGithubJobs(searchString) {
  const q = encodeURIComponent(searchString)
  const request = await fetch(
    `https://jobs.github.com/positions.json?search=${q}&page=1`
  )
  return await request.json()
}

function mapSetStateToProps(setState) {
  return {
    onSearchChange: createStream(
      path(['target', 'value']),
      tap(searchString => setState({ searchString })),
      debounce(500),
      searchGithubJobs,
      tap(results => setState({ results }))
    )
  }
}

export default bind(mapSetStateToProps, { searchString: '', results: [] })(App)
