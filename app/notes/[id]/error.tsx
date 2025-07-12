'use client'

interface Props {
  error: Error
  reset: () => void
}

export default function NoteDetailsError({ error }: Props) {
  return (
    <p>Could not fetch note details. {error.message}</p>
  )
}
