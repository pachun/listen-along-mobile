export const spotifyUsersFromState = (state: IState) => {
  return state.spotifyUsers
}

export const mySpotifyUserFromState = (state: IState) => {
  return spotifyUsersFromState(state).find(
    spotifyUser => spotifyUser.is_me === true,
  )
}
