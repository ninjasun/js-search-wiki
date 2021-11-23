import 'bootstrap/dist/css/bootstrap.min.css'
import { ifElse, isEmpty, pipe, tap } from 'ramda'
import getInputValue from './getInputValue'
import getUrl from './getUrl'
import Results from './Results'

const doNothing = () => {}

const render = markup => {
  const resultsElement = document.getElementById('results')

  resultsElement.innerHTML = markup
}

const searchAndRenderResults = pipe(getUrl, url =>
  fetch(url)
    .then(res => res.json())
    .then(Results)
    .then(render)
)

const makeSearchRequestIfValid = pipe(
  getInputValue,
  ifElse(isEmpty, doNothing, searchAndRenderResults)
)

const inputElement = document.querySelector('input')

inputElement.addEventListener('keyup', searchAndRenderResults)
