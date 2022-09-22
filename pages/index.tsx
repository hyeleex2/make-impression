import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const inputFile = useRef<HTMLInputElement>(null)

  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(null)


  const handleImageUpload = useCallback(() => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }, [])
  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result)
      }
      reader.readAsDataURL(files[0])  
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className="p-4 min-w-60">
        <div className="flex flex-nowrap space-x-4 w-full">
          <div className="w-1/3 text-center">
            사람
          </div>
          <div className="w-1/3 text-center">
            첫인상
          </div>
          <div className="w-1/3 text-center">
            현인상
          </div>
        </div>
        <div className="flex flex-nowrap space-x-4 w-full">
          {/* 컴포넌트 하나로 뺄 수 있을 듯 */}
          <div className="w-1/3 h-32 border border-gray-300 rounded"
            onClick={handleImageUpload}
          >
            <input type="file" ref={inputFile}
              className="hidden" accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange} />
          </div>

          <div className="w-1/3 h-32 border border-gray-300 rounded">
            첫인상
          </div>
          <div className="w-1/3 h-32 border border-gray-300 rounded">
            현인상
          </div>
        </div>
        <img src={previewImg} alt="img" />
        <div className="flex-col mt-20">
          <button className='block'>추가 버튼</button>
          <button className='block'>이미지로 저장</button>  
        </div>
      </main>
    </div>
  )
}

export default Home