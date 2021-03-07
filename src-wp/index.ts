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
const inputsField01 = referenceTo<HTMLInputElement>('inputs-field01')
const inputsField02 = referenceTo<HTMLInputElement>('inputs-field02')
const pdf = referenceTo<HTMLIFrameElement>('pdf')
pdf.onload = () => console.log(`pdf.onload()`)

const initPdf = async () => {
  const fontBytes = await fetch('Koruri-Regular.ttf').then(res => res.arrayBuffer())
  const pdfBytes = await fetch('with_update_sections.pdf').then(res => res.arrayBuffer())
  showPdf(inputsField01.value, inputsField02.value, pdfBytes, fontBytes)
  inputsUpdate.onclick = ev => showPdf(inputsField01.value, inputsField02.value, pdfBytes, fontBytes)
}

const showPdf = async (field01: string, field02: string, pdfBytes: ArrayBuffer, fontBytes: ArrayBuffer) => {
  const template: Template = {
    fontName: 'Koruri',
    basePdf: pdfBytes,
    schemas: [
      {
        field01: { type: "text", width: 50, height: 50, position: { x: 20, y: 20 }, fontSize: 30, fontColor: '#c51162' },
        field02: { type: "text", width: 50, height: 50, position: { x: 20, y: 40 }, fontSize: 20, fontColor: '#c51162' },
      }
    ],
  }
  const inputs = [{ field01: field01, field02: field02 }]
  const font = { Koruri: fontBytes }
  const pdf = await labelmake({ template, inputs, font })
  const blob = new Blob([pdf.buffer], { type: "application/pdf" })
  const container = document.getElementById('pdf')
  if (container instanceof HTMLIFrameElement) container.src = URL.createObjectURL(blob)
}

inputsField01.value = 'ABC'
inputsField02.value = "#$%&'()=~|"
initPdf()
