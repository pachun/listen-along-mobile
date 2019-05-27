export const spotifyUsersFromState = (state: IState) => {
  return state.spotifyUsers
}

export const broadcastersFromState = (state: IState) => {
  return state.spotifyUsers.filter(
    spotifyUser => spotifyUser.is_listening && !spotifyUser.broadcaster,
  )
}

export const mySpotifyUserFromState = (state: IState) => {
  return spotifyUsersFromState(state).find(
    spotifyUser => spotifyUser.is_me === true,
  )
}

export const idsOfSongsAddedToLibraryFromState = (state: IState) => {
  return state.idsOfSongsAddedToLibrary
}

export const currentSongIdFromState = (state: IState) => {
  return mySpotifyUserFromState(state).song_uri.split(":")[2]
}

export const currentSongNameFromState = (state: IState) => {
  return mySpotifyUserFromState(state).song_name
}

export const currentSongAlreadyAddedToLibraryFromState = (state: IState) => {
  const idsOfSongsAddedToLibrary = idsOfSongsAddedToLibraryFromState(state)
  const currentSongId = mySpotifyUserFromState(state).song_uri.split(":")[2]
  return idsOfSongsAddedToLibrary.includes(currentSongId)
}
