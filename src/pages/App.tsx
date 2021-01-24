import { Component } from 'react'
import api from '../api'
import './App.css'

interface State {
  storyDescription: string,
  characters: {
    name: string,
    thumbnail: string
  }[],
  attributionText: string,
  error: boolean
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      storyDescription: '',
      characters: [],
      attributionText: '',
      error: false
    }
  }

  errorHandling(e: Error) {
    console.error(e.message)
    this.setState({ error: true })
  }

  async componentDidMount() {
    // Stories w/ description 47832, 52660, 14194, 13151
    let path = 'https://gateway.marvel.com/v1/public/stories/47832',
        offset = 0;

    // This chunk of code selects a random Spider-man story
    if (process.env.REACT_APP_RANDOM) {
      try {
        path = 'https://gateway.marvel.com/v1/public/characters/1009610/stories'
        const { data } = await api.getStory(path)
        offset = Math.floor(Math.random() * data.total)
      } catch (e) {
        return this.errorHandling(e)
      }
    }

    api.getStory(path, offset).then(story => {
      this.setState({
        storyDescription: story.data.results[0].description.length > 0
          ? story.data.results[0].description.replace(/(<([^>]+)>)/ig, '')
          : story.data.results[0].title.length === 0
            ? '-- Story with neither title nor description --'
            : story.data.results[0].title.length < 9
              ? `Story "${story.data.results[0].title}", from the comic book "${story.data.results[0].comics.items[0].name}"`
              : story.data.results[0].title,
        attributionText: story.attributionText
      })
      story.data.results[0].characters.items.forEach((i) => {
        api.getHero(i.resourceURI).then(char => {
          this.setState((state) => ({
            characters: [
              ...state.characters,
              {
                name: char.data.results[0].name,
                thumbnail: `${char.data.results[0].thumbnail.path}.${char.data.results[0].thumbnail.extension}`
              }
            ]
          }))
        }).catch(e => this.errorHandling(e))
      })
    }).catch(e => this.errorHandling(e))
  }

  render() {
    return (
      <div className="App">
        {this.state.error
          ? <div className="error">Sorry, but there was an error when loading this page<br/>😢</div>
          : this.state.storyDescription.length === 0
            ? <div className="loading-ring"><div></div><div></div><div></div><div></div></div>
            : <>
              <header className="description">
                {this.state.storyDescription}
              </header>
              <p className="subtitle">Characters</p>
              <div className="characters">
                {this.state.characters.map((char, i) =>
                  <div key={i}>
                    {char.name}
                    <img src={char.thumbnail} alt={char.name} />
                  </div>
                )}
              </div>
              <div className="attributionText">
                {this.state.attributionText}
              </div>
            </>
        }
      </div>
    )
  }
}
