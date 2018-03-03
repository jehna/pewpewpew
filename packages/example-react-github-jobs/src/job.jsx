import React from 'react'
import { bind } from '@pewpewpew/react'

function Job({ onShowMore, onShowLess, showDetails, job }) {
  return (
    <section style={{ marginTop: '1em' }}>
      <article>
        <h3>{job.title}</h3>
        <p>{job.company}</p>
        {showDetails ? (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: job.description + job.how_to_apply
              }}
            />
            <p>
              <button type="button" onClick={onShowLess}>
                Show less...
              </button>
            </p>
          </div>
        ) : (
          <p>
            <button type="button" onClick={onShowMore}>
              Read more...
            </button>
          </p>
        )}
      </article>
    </section>
  )
}

function mapSetStateToProps(setState) {
  return {
    onShowMore: () => setState({ showDetails: true }),
    onShowLess: () => setState({ showDetails: false })
  }
}

export default bind(mapSetStateToProps, { showDetails: false })(Job)
