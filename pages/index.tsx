import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useRef, useState } from 'react'
import { List } from 'components/List'
import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'

const Home: NextPage = () => {
  const downloadRef = useRef<HTMLDivElement>(null)
  const testRef = useRef<HTMLDivElement>(null)
  const [listCnt, setListCnt] = useState(1)
  const maxCnt = 7

  const clickSaveBtn = async () => {
    if (downloadRef.current) {
      const dataUrl = await domtoimage.toPng(downloadRef.current)
      console.log('dataUrl : ', dataUrl)
      const img = new Image()
      img.src = dataUrl
      const tab = window.open('', '_blank')
      tab?.document.write(img.outerHTML)
      // const a = document.createElement('a')
      // a.setAttribute('download', 'reactflow.png')
      // a.setAttribute('href', dataUrl)
      // a.click()
      // saveAs(dataUrl, 'impression.png')
    }
  }

  const test = async () => {
    if (testRef.current) {
      const img = await domtoimage.toBlob(testRef?.current)
      console.log('img : ', img)
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container md:container md:mx-auto min-h-screen min-w-full bg-white">
        <main className="p-4 min-w-[90%] min-h-96">
          <div>
            <h3 className="font-bold text-center text-2xl m-4 text-black">첫인상/현인상 만들기</h3>
            <div ref={downloadRef}>
              <div className="flex flex-nowrap space-x-4 w-full mb-3">
                <div className="w-1/3 text-center text-black">사람</div>
                <div className="w-1/3 text-center text-black">첫인상</div>
                <div className="w-1/3 text-center text-black">현인상</div>
              </div>
              {Array.from({ length: listCnt }).map((key, index) => {
                return <List key={index} />
              })}
            </div>
          </div>
        </main>
        {/* <div ref={testRef}>
          <img src="https://i.pinimg.com/236x/b8/0f/78/b80f78373c2903fe3362cbf06a3cbd92.jpg" />
        </div> */}
        <div className="flex flex-col mt-20 justify-center items-center">
          <button className="block border rounded-full p-2 m-2 w-32 text-black" onClick={addItem}>
            추가
          </button>
          <button className="block border rounded-full p-2 m-2 w-32 text-black" onClick={clickSaveBtn}>
            이미지로 저장
          </button>

          <button className="block border rounded-full p-2 m-2 w-32 text-black" onClick={test}>
            테스트
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
