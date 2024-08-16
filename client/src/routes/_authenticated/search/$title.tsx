import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/search/$title')({
  component: () => <div>Hello /search/$title!</div>
})