import { ChangeEvent, useRef, useState } from 'react'

export const ImageCard = () => {
  const inputFile = useRef<HTMLInputElement>(null)

  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const handleImageUpload = () => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      const result = await readFileAsDataURL(files[0])
      result && setPreviewImg(result)
    }
  }

  const readFileAsDataURL = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }
  return (
    <div
      className="w-1/3 h-32 bg-slate-200 border-gray-300 rounded bg-no-repeat bg-center bg-cover cursor-pointer"
      onClick={handleImageUpload}
      style={{ backgroundImage: `url(${previewImg})` }}
    >
      <input type="file" ref={inputFile} className="hidden" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
    </div>
  )
}
