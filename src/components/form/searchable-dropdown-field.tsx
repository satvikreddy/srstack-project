import * as React from 'react'
import { AppFieldError, AppFieldLabel } from '@/components/form/field'
import { AppFieldApi } from '@/components/form/field.types'
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, XIcon } from 'lucide-react'

type Props<TValue> = {
  field: AppFieldApi<TValue>

  label: string
  /**
   * This function is called on every keystroke.
   * If you want debouncing, handle that outside of this function.
   *
   * @param text - The text to get suggestions for.
   * @returns If null, that means search was not run yet.
   */
  getSuggestions: (text: string) => Promise<Array<TValue> | null>

  /** Shown when option is selected */
  itemBuilder: (item: TValue) => React.ReactNode

  /** Shown in suggestions list */
  suggestionBuilder: (item: TValue) => React.ReactNode
}

const SearchableDropdownField = <TValue,>({
  field,
  label,
  getSuggestions,
  itemBuilder,
  suggestionBuilder,
}: Props<TValue>) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<TValue[] | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    let isMounted = true

    if (!search) {
      setSuggestions(null)
      return
    }

    const fetchSuggestions = async () => {
      setIsLoading(true)
      try {
        const res = await getSuggestions(search)
        if (!isMounted) return
        setSuggestions(res)
        if (res !== null) {
          setOpen(true)
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchSuggestions()

    return () => {
      isMounted = false
    }
  }, [search, getSuggestions])

  const hasValue = field.state.value !== undefined && field.state.value !== null

  return (
    <div className="space-y-1">
      <AppFieldLabel>{label}</AppFieldLabel>

      {hasValue ? (
        <div className="border-input flex min-h-[40px] items-center justify-between rounded-md border p-2 shadow-xs">
          <div className="flex-1">{itemBuilder(field.state.value as TValue)}</div>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => {
              field.handleChange(undefined as any)
              setSearch('')
              setSuggestions(null)
              setTimeout(() => {
                inputRef.current?.focus()
              }, 0)
            }}
            className="shrink-0"
          >
            <XIcon />
          </Button>
        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverAnchor asChild>
            <div className="relative flex w-full items-center">
              <Input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                onFocus={() => {
                  if (suggestions !== null) setOpen(true)
                }}
              />
              {isLoading && (
                <div className="absolute right-3">
                  <Loader2 className="text-muted-foreground size-4 animate-spin" />
                </div>
              )}
            </div>
          </PopoverAnchor>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) min-w-[200px] p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="max-h-64 overflow-y-auto p-1">
              {suggestions?.length === 0 ? (
                <div className="text-muted-foreground p-4 text-center text-sm">
                  No results found.
                </div>
              ) : (
                suggestions?.map((item, index) => (
                  <div
                    key={index}
                    className="hover:bg-muted cursor-pointer rounded-sm px-2 py-1.5 text-sm"
                    onClick={() => {
                      field.handleChange(item)
                      setOpen(false)
                      setSearch('')
                      setSuggestions(null)
                    }}
                  >
                    {suggestionBuilder(item)}
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}

      <AppFieldError field={field} />
    </div>
  )
}

export default SearchableDropdownField
