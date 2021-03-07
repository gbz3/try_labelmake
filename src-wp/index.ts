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
  const fieldNames = (from: number, to: number) => Array.from({length: (to - from + 1)}, (_, k) => `field${(k + from).toString().padStart(2, '0')}`)
  const fields = fieldNames(1, 20).map(e => referenceTo<HTMLInputElement>(e))
  showPdf(pdfBytes, fontBytes, fields)
  inputsUpdate.onclick = ev => showPdf(pdfBytes, fontBytes, fields)
}

const fColor = '#c51162'
const showPdf = async (pdfBytes: ArrayBuffer, fontBytes: ArrayBuffer, fields: HTMLInputElement[]) => {
  const template: Template = {
    fontName: 'Koruri',
    basePdf: pdfBytes,
    schemas: [
      {
        field01: { type: "text", width: 50, height: 50, position: { x: 20, y: 20 }, fontSize: 20, fontColor: fColor },
        field02: { type: "text", width: 50, height: 50, position: { x: 20, y: 30 }, fontSize: 20, fontColor: fColor },
        field03: { type: "text", width: 50, height: 50, position: { x: 20, y: 40 }, fontSize: 20, fontColor: fColor },
        field04: { type: "text", width: 50, height: 50, position: { x: 20, y: 50 }, fontSize: 20, fontColor: fColor },
        field05: { type: "text", width: 50, height: 50, position: { x: 20, y: 60 }, fontSize: 20, fontColor: fColor },
        field06: { type: "text", width: 50, height: 50, position: { x: 20, y: 70 }, fontSize: 20, fontColor: fColor },
        field07: { type: "text", width: 50, height: 50, position: { x: 20, y: 80 }, fontSize: 20, fontColor: fColor },
        field08: { type: "text", width: 50, height: 50, position: { x: 20, y: 90 }, fontSize: 20, fontColor: fColor },
        field09: { type: "text", width: 50, height: 50, position: { x: 20, y: 100 }, fontSize: 20, fontColor: fColor },
        field10: { type: "text", width: 50, height: 50, position: { x: 20, y: 110 }, fontSize: 20, fontColor: fColor },
        field11: { type: "text", width: 50, height: 50, position: { x: 20, y: 120 }, fontSize: 20, fontColor: fColor },
        field12: { type: "text", width: 50, height: 50, position: { x: 20, y: 130 }, fontSize: 20, fontColor: fColor },
        field13: { type: "text", width: 50, height: 50, position: { x: 20, y: 140 }, fontSize: 20, fontColor: fColor },
        field14: { type: "text", width: 50, height: 50, position: { x: 20, y: 150 }, fontSize: 20, fontColor: fColor },
        field15: { type: "text", width: 50, height: 50, position: { x: 20, y: 160 }, fontSize: 20, fontColor: fColor },
        field16: { type: "text", width: 50, height: 50, position: { x: 20, y: 170 }, fontSize: 20, fontColor: fColor },
        field17: { type: "text", width: 50, height: 50, position: { x: 20, y: 180 }, fontSize: 20, fontColor: fColor },
        field18: { type: "text", width: 50, height: 50, position: { x: 20, y: 190 }, fontSize: 20, fontColor: fColor },
        field19: { type: "text", width: 50, height: 50, position: { x: 20, y: 200 }, fontSize: 20, fontColor: fColor },
        field20: { type: "text", width: 50, height: 50, position: { x: 20, y: 210 }, fontSize: 20, fontColor: fColor },
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
