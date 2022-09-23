import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useRef, useState } from 'react'
import { List } from 'components/List'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'

const Home: NextPage = () => {
  const downloadRef = useRef<HTMLDivElement>(null)
  const [listCnt, setListCnt] = useState(1)
  const maxCnt = 5

  const clickSaveBtn = async () => {
    if (downloadRef.current) {
      const dataUrl = await domtoimage.toPng(downloadRef.current)
      // const link = document.createElement('a')
      // link.href = dataUrl
      // link.download = 'impression.png'
      // link.click()
      saveAs(dataUrl, 'impression.png')
      // setTimeout(() => {
      //   link.remove()
      //   window.URL.revokeObjectURL(dataUrl)
      // })
    }
  }

  const addItem = useCallback(() => {
    if (listCnt === maxCnt) {
      alert(`최대 ${maxCnt}명까지 만들 수 있습니다.`)
      return
    }
    setListCnt((prev) => prev + 1)
  }, [listCnt])

  return (
    <div>
      <Head>
        <title>첫인상 현인상 만들기</title>
        <meta name="description" content="첫인상 현인상 만들기" />
      </Head>
      <div className="container md:container md:mx-auto min-h-screen min-w-full">
        <main className="p-4 min-w-[90%] min-h-96" ref={downloadRef}>
          <div>
            <h3 className="font-bold text-center text-2xl m-4">첫인상/현인상 만들기</h3>
            <div>
              <div className="flex flex-nowrap space-x-4 w-full mb-3">
                <div className="w-1/3 text-center">사람</div>
                <div className="w-1/3 text-center">첫인상</div>
                <div className="w-1/3 text-center">현인상</div>
              </div>
              {Array.from({ length: listCnt }).map((key, index) => {
                return <List key={index} />
              })}
            </div>
          </div>
        </main>
        <div className="flex flex-col mt-20 justify-center items-center">
          <button className="block border rounded-full p-2 m-2 w-32" onClick={addItem}>
            ADD
          </button>
          <button className="block border rounded-full p-2 m-2 w-32" onClick={clickSaveBtn}>
            Save To Image
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
