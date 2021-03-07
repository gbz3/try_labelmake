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
const pdf = referenceTo<HTMLIFrameElement>('pdf')
pdf.onload = () => console.log(`pdf.onload()`)

const initPdf = async () => {
  const fontBytes = await fetch('Koruri-Regular.ttf').then(res => res.arrayBuffer())
  const pdfBytes = await fetch('with_update_sections.pdf').then(res => res.arrayBuffer())
  const fields = ['field01', 'field02'].map(e => referenceTo<HTMLInputElement>(e))
  showPdf(pdfBytes, fontBytes, fields)
  inputsUpdate.onclick = ev => showPdf(pdfBytes, fontBytes, fields)
}

const showPdf = async (pdfBytes: ArrayBuffer, fontBytes: ArrayBuffer, fields: HTMLInputElement[]) => {
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
  const inputs = [Object.assign({}, ...fields.map((e, i) => ({ [e.id]: e.value })))]
  const font = { Koruri: fontBytes }
  const pdf = await labelmake({ template, inputs, font })
  const blob = new Blob([pdf.buffer], { type: "application/pdf" })
  const container = document.getElementById('pdf')
  if (container instanceof HTMLIFrameElement) container.src = URL.createObjectURL(blob)
}

initPdf()
