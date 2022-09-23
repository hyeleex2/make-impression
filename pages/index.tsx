import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import { List } from 'components/List'
import domtoimage from 'dom-to-image'

const Home: NextPage = () => {
  const downloadRef = useRef<HTMLDivElement>(null)
  // const list = useState([
  //   {
  //     index: 0,
  //   },
  // ])

  const clickSaveBtn = () => {
    if (downloadRef.current) {
      domtoimage.toPng(downloadRef.current).then((dataUrl: string) => {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'impression.png'
        link.click()
        setTimeout(() => {
          link.remove()
          window.URL.revokeObjectURL(dataUrl)
        })
      })
    }
  }

  const addItem = () => {}

  return (
    <div>
      <Head>
        <title>첫인상 현인상 만들기</title>
        <meta name="description" content="첫인상 현인상 만들기" />
      </Head>
      <div className="container md:container md:mx-auto">
        <main className="p-4 min-w-[90%]">
          <div ref={downloadRef}>
            <h3 className="font-bold text-center text-2xl m-4">첫인상/현인상 만들기~!~!</h3>
            <div>
              <div className="flex flex-nowrap space-x-4 w-full mb-3">
                <div className="w-1/3 text-center">사람</div>
                <div className="w-1/3 text-center">첫인상</div>
                <div className="w-1/3 text-center">현인상</div>
              </div>
              <List />
            </div>
          </div>

          <div className="flex flex-col mt-20 justify-center items-center">
            <button className="block border rounded-full p-2 m-2 w-32" onClick={addItem}>
              ADD
            </button>
            <button className="block border rounded-full p-2 m-2 w-32" onClick={clickSaveBtn}>
              Save To Image
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
