/**
 * @jest-environment jsdom
 */

const { fetchWord, displayWord, displayError, clearError } = require('../index')

// Mock DOM elements
beforeEach(() => {
  document.body.innerHTML = `
    <div>
      <input type="text" id="word-input" />
      <div id="error" class="hidden"></div>
      <h2 id="word-title"></h2>
      <p id="phonetic"></p>
      <audio id="audio" class="hidden"></audio>
      <p id="definition"></p>
      <p id="synonyms"></p>
    </div>
  `
})

describe('Wordly SPA Functions', () => {
  test('displayWord updates the DOM correctly', () => {
    const mockData = {
      word: 'apple',
      phonetic: '/ˈæp.əl/',
      meanings: [
        {
          definitions: [
            {
              definition: 'A fruit',
              synonyms: ['malus', 'pome']
            }
          ]
        }
      ],
      phonetics: [
        { audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/apple-us.mp3' }
      ]
    }

    displayWord(mockData)

    expect(document.getElementById('word-title').textContent).toBe('apple')
    expect(document.getElementById('phonetic').textContent).toBe('/ˈæp.əl/')
    expect(document.getElementById('definition').textContent).toBe('A fruit')
    expect(document.getElementById('synonyms').textContent).toBe('malus, pome')
    expect(document.getElementById('audio').src).toBe('https://api.dictionaryapi.dev/media/pronunciations/en/apple-us.mp3')
    expect(document.getElementById('audio').classList.contains('hidden')).toBe(false)
  })

  test('displayError shows error message', () => {
    displayError('Word not found')
    const errorDiv = document.getElementById('error')
    expect(errorDiv.textContent).toBe('Word not found')
    expect(errorDiv.classList.contains('hidden')).toBe(false)
  })

  test('clearError hides error message', () => {
    displayError('Word not found')
    clearError()
    const errorDiv = document.getElementById('error')
    expect(errorDiv.textContent).toBe('')
    expect(errorDiv.classList.contains('hidden')).toBe(true)
  })
})
