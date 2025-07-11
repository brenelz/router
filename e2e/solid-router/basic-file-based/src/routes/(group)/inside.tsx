import { createFileRoute } from '@tanstack/solid-router'
import { getRouteApi, useSearch } from '@tanstack/solid-router'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-adapter'

const routeApi = getRouteApi('/(group)/inside')

export const Route = createFileRoute('/(group)/inside')({
  validateSearch: zodValidator(z.object({ hello: z.string().optional() })),
  component: () => {
    const searchViaHook = useSearch({ from: '/(group)/inside' })
    const searchViaRouteHook = Route.useSearch()
    const searchViaRouteApi = routeApi.useSearch()
    return (
      <>
        <div data-testid="search-via-hook">{searchViaHook().hello}</div>
        <div data-testid="search-via-route-hook">
          {searchViaRouteHook().hello}
        </div>
        <div data-testid="search-via-route-api">
          {searchViaRouteApi().hello}
        </div>
      </>
    )
  },
})
