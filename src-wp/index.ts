import { hello } from './modules/sub'
import labelmake from 'labelmake'
import { Template } from 'labelmake/dist/types/type'
import 'bootstrap'
import './index.scss'

hello()

const referenceTo = <T extends HTMLElement>(id: string) => {
  const idRef = document.getElementById(id)
  if (idRef == null) throw new Error(`${id} not found.`)
  return idRef as T
}
const inputsUpdate = referenceTo<HTMLButtonElement>('inputs-update')
const inputsField1 = referenceTo<HTMLInputElement>('inputs-field1')
const inputsField2 = referenceTo<HTMLInputElement>('inputs-field2')
const pdf = referenceTo<HTMLIFrameElement>('pdf')
pdf.onload = () => console.log(`pdf.onload()`)

const initPdf = async () => {
  const fontBytes = await fetch('Koruri-Regular.ttf').then(res => res.arrayBuffer())
  const pdfBytes = await fetch('with_update_sections.pdf').then(res => res.arrayBuffer())
  showPdf(inputsField1.value, inputsField2.value, pdfBytes, fontBytes)
  inputsUpdate.onclick = ev => showPdf(inputsField1.value, inputsField2.value, pdfBytes, fontBytes)
}

const showPdf = async (field1: string, field2: string, pdfBytes: ArrayBuffer, fontBytes: ArrayBuffer) => {
  const template: Template = {
    fontName: 'Koruri',
    basePdf: pdfBytes,
    schemas: [
      {
        field1: { type: "text", width: 50, height: 50, position: { x: 20, y: 20 }, fontSize: 30, fontColor: '#c51162' },
        field2: { type: "text", width: 50, height: 50, position: { x: 20, y: 40 }, fontSize: 20, fontColor: '#c51162' },
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

inputsField1.value = 'ABC'
inputsField2.value = "#$%&'()=~|"
initPdf()
