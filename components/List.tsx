import { ImageCard } from 'components/ImageCard'

export const List = () => {
  return (
    <div className="flex flex-nowrap space-x-4 w-full mb-4">
      <ImageCard />
      <ImageCard />
      <ImageCard />
    </div>
  )
}
