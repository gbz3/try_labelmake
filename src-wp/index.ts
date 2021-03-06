import { hello } from './modules/sub'
import labelmake from 'labelmake'
import { Template } from 'labelmake/dist/types/type'
import 'bootstrap'
import './index.scss'

hello()

const showPdf = async (field1: string, field2: string) => {
  const fontBytes = await fetch('Koruri-Regular.ttf').then(res => res.arrayBuffer())
  const template: Template = {
    fontName: 'Koruri',
    basePdf: { width: 200, height: 100 },
    schemas: [
      {
        field1: { type: "text", width: 50, height: 50, position: { x: 20, y: 20 }, fontSize: 30 },
        field2: { type: "text", width: 50, height: 50, position: { x: 20, y: 40 }, fontSize: 20 },
      }
    ],
  }
  const inputs = [{ field1: field1, field2: field2 }]
  const font = { Koruri: fontBytes }
  const pdf = await labelmake({ template, inputs, font })
  const blob = new Blob([pdf.buffer], { type: "application/pdf" })
  const container = document.getElementById('pdf')
  if (container instanceof HTMLIFrameElement) container.src = URL.createObjectURL(blob)
}
showPdf('ABC', "#$%&'()=~|")
const btnUpdate = document.getElementById('inputs-update')
if (btnUpdate instanceof HTMLButtonElement) btnUpdate.onclick = ev => {
  const f1 = document.getElementById('inputs-field1') as HTMLInputElement
  const f2 = document.getElementById('inputs-field2') as HTMLInputElement
  showPdf(f1.value, f2.value)
}
