import { createStore } from "redux"

interface IReduxActionUpdateSpotifyUsers {
  type: string
  spotifyUsers: ISpotifyUser[]
}
interface IReduxActionAddSongToLibrary {
  type: string
  songId: string
}
type IReduxAction =
  | IReduxActionUpdateSpotifyUsers
  | IReduxActionAddSongToLibrary
  | undefined

const initialState: IState = {
  spotifyUsers: [],
  idsOfSongsAddedToLibrary: [],
}

const reducer = (state: IState = initialState, action: IReduxAction) => {
  if (action === undefined) {
    return state
  } else if (action.type === "UPDATE_SPOTIFY_USERS") {
    const updateSpotifyUsersAction = action as IReduxActionUpdateSpotifyUsers
    return {
      spotifyUsers: updateSpotifyUsersAction.spotifyUsers,
      idsOfSongsAddedToLibrary: state.idsOfSongsAddedToLibrary,
    }
  } else if (action.type === "ADD_SONG_TO_LIBRARY") {
    const addSongToLibraryAction = action as IReduxActionAddSongToLibrary
    return {
      spotifyUsers: state.spotifyUsers,
      idsOfSongsAddedToLibrary: [
        ...state.idsOfSongsAddedToLibrary,
        addSongToLibraryAction.songId,
      ],
    }
  }
  return state
}

const store = createStore(reducer)

export default store
