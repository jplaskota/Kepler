import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/series')({
  component: () => <div>Hello /series!</div>
})