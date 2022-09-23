import { ImageCard } from 'components/ImageCard'

export interface ListProp {
  list: []
}

export const List = (props: ListProp) => {
  return (
    <div className="flex flex-nowrap space-x-4 w-full">
      <ImageCard />
      <ImageCard />
      <ImageCard />
    </div>
  )
}
