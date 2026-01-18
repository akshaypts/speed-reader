import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <div className="container mx-auto py-8 px-4 flex flex-col min-h-screen">
          <main className="flex-1 flex flex-col justify-center">
            <Outlet />
          </main>
      </div>
    </div>
  )
}
