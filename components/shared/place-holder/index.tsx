import { Skeleton } from "@repo/ui/components/skeleton"

type PlaceholderProps = {
  variant?: "list" | "user-list"
}

const ListCard = () => (
  <div className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="space-y-4">
        <div className="relative h-56 w-full overflow-hidden rounded-sm">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-7 w-full" />
            <div className="flex max-w-xs items-center space-x-5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="max-w-xs space-y-4">
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

const UserListCard = () => (
  <div className="space-y-10">
    {Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        className="flex h-fit w-full flex-col gap-4 sm:flex-row sm:gap-8"
      >
        <div className="order-2 flex-1 sm:order-1">
          <div className="space-y-2 sm:space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="h-5 w-10" />
            </div>
          </div>
        </div>
        <div className="relative order-1 h-[100px] w-[200px] sm:order-2">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    ))}
  </div>
)

function Placeholder({ variant = "list" }: PlaceholderProps) {
  const components: Record<Required<PlaceholderProps>["variant"], JSX.Element> =
    {
      list: <ListCard />,
      "user-list": <UserListCard />,
    }

  return components[variant]
}

export { Placeholder }
