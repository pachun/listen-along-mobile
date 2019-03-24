interface ISpotifyUser {
  id: number
  username: string
  display_name: string
  is_me: boolean
  is_listening: boolean
  avatar_url: string
  song_album_cover_url: string
  listening_along: boolean
  song_artists: string[]
  song_name: string
  song_uri: string
  broadcaster: ISpotifyUser | null
}
