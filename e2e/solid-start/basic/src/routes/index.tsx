import { createFileRoute, Link, Navigate, useRouterState } from '@tanstack/solid-router'
import { createResource, startTransition, Suspense } from 'solid-js'
import { CustomMessage } from '~/components/CustomMessage'

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: (search: { n?: number }) => ({ n: search.n ?? 1 }),
})

function Home() {
  const navigate = Route.useNavigate();
  const match = useRouterState({
    select: (state: any) => {
      return state.location;
      // const match = state.matches.find((d: any) =>
      //   "/" === d.routeId,
      // )

      // if (match === undefined) {
      //   return undefined
      // }

      // return match;
    },
  })
  // const match = useRouterState({
  //   select: (state: any) => {
  //     const match = state.matches.find((d: any) =>
  //       "/" === d.routeId,
  //     )

  //     if (match === undefined) {
  //       return undefined
  //     }

  //     return match;
  //   },
  // })

  const [doubleQuery] = createResource(
    () => match().search.n,
    async (n) => {
      await new Promise((r) => setTimeout(r, 1000))
      return n * 2
    }
  )

  return (
    <div class="p-2">
      <h3>Welcome Home!!!</h3>
      <CustomMessage message="Hello from a custom component!" />
      <p>
        {/* <Link
          class="border bg-gray-50 px-3 py-1"
          from="/"
          search={(s) => ({ n: s.n + 1 })}
        >
          Increase
        </Link> */}
        <button onClick={() => startTransition(() => navigate({ to: '/', search: { n: match().search.n + 1 } }))}>
          Increase
        </button>
      </p>

      {/* 👇 With structuralSharing: true, this will NOT show fallback on navigations when search params don't change */}
      <Suspense fallback="Loading...">
        <p>n: {match().search.n}
          <br />
          double: {doubleQuery()}
        </p>
      </Suspense>
    </div>
  )
}
